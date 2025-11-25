import DefaultAvatar from "../model/DefaultAvatar.js";
import OTP from "../model/OTP.js";
import Session from "../model/Session.js";
import User from "../model/User.js";
import { isOtpValid } from "../services/isOtpValid.js";
import { sendEmail } from "../services/sendEmailService.js";
import { readFile } from "fs/promises";

const sendOtp = async (res, email, subject, emailContentHtmlPath, name) => {
  try {
    const otp = String(Math.floor(Math.random() * 90000) + 10000);
    const emailContentHtml = (await readFile(emailContentHtmlPath, "utf-8"))
      .replaceAll("{{userName}}", name || "")
      .replaceAll("{{appName}}", process.env.APP_NAME)
      .replaceAll("{{otp}}", otp)
      .replaceAll("{{year}}", new Date().getFullYear());
    await sendEmail(email, subject, emailContentHtml);
    const existingOTP = await OTP.findOne({ email });
    if (existingOTP) {
      existingOTP.otp = otp;
      existingOTP.createdAt = Date.now();
      await existingOTP.save();
    } else {
      await OTP.create({ otp, email });
    }
    return res.status(201).json({
      success: true,
      message: `OTP sent successfully to ${email}.`,
    });
  } catch (error) {
    throw new Error("Failed to send OTP. Please try again later.");
  }
};

export const sendOtpForSignUp = async (req, res) => {
  try {
    const { email, name } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Account already exists with this email.",
      });
    }
    await sendOtp(
      res,
      email,
      "Your OTP Code for Account Verification",
      "./templates/otp.html",
      name,
    );
  } catch (error) {
    // vikas-validation error
    console.log(error);
    throw new Error("Failed to send OTP. Please try again later.");
  }
};

export const createAccount = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered. Please use another email",
      });
    }

    const isOTPValid = await isOtpValid(email, otp);
    //vikas-repeating-code
    if (!isOTPValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    await User.create(req.body);

    return res.status(201).json({
      success: true,
      message: `Account created successfully`,
    });
  } catch (error) {
    console.log(error);
    //vikas-left to review
    if (error.name === "ValidationError") {
      const errorData = {};
      for (const key in error.errors) {
        errorData[error.errors[key].path] = error.errors[key].message;
      }
      return res.status(400).json({ success: false, message: errorData });
    }
    throw new Error();
  }
};

export const login = async (req, res) => {
  try {
    const { password, email, isLogoutOtherDevices } = req.body;
    const user = await User.findOne({ email, isDeleted: false });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials.." });
    }
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials." });
    }
    if (isLogoutOtherDevices) {
      const r1 = await Session.deleteMany({ userId: user.id });
      console.log({ r1 });
    }

    const allSessions = await Session.find({ userId: user._id });
    console.log("allSessions", allSessions);
    if (allSessions.length >= 2) {
      return res
        .status(403)
        .json({ message: "Already 2 devcies are logged in " });
    } else {
      let existingSession;
      if (req.cookies.sessionId) {
        existingSession = await Session.findOne({
          _id: req.cookies.sessionId,
          userId: user._id,
        });
      }

      console.log({ existingSession });

      let sessionId;
      if (existingSession) {
        existingSession.createdAt = Date.now();
        await existingSession.save();
        sessionId = existingSession.id;
      } else {
        const session = await Session.create({ userId: user._id });
        console.log("session-session-session", session);
        sessionId = session.id;
      }
      console.log("sessionId", sessionId);
      res.cookie("sessionId", sessionId, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        sameSite:"lax"
      });

      return res
        .status(200)
        .json({ success: true, message: "Login successful." });
    }
  } catch (error) {
    console.log(error);
    throw new Error("");
  }
};

export const logout = async (req, res) => {
  try {
    const user = req.user;
    const { sessionId } = req.cookies;
    await Session.deleteOne({ _id: sessionId, userId: user.id });
    res.clearCookie("sessionId", {
      httpOnly: true,
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    throw new Error("Unable to logout. Please try again.");
  }
};

export const logoutAll = async (req, res) => {
  try {
    const user = req.user;
    await Session.deleteMany({ userId: user.id });
    res.clearCookie("sessionId", {
      httpOnly: true,
    });

    return res.status(200).json({
      success: true,
      message: "All devices Logged out.",
    });
  } catch (error) {
    throw new Error("Unable to logout All devices. Please try again.");
  }
};

//vikas-missing-deleting quiz and its other data
export const deleteUser = async (req, res) => {
  try {
    const user = req.user;
    if (user.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    await Session.deleteMany({ userId: user._id });
    await OTP.deleteMany({ email: user.email });
    user.isDeleted = true;
    user.deletedAt = new Date();
    await user.save();
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

export const uploadAvatar = async (req, res) => {
  try {
    const user = req.user;

    if (!req.file) {
      return res.status(400).json({ message: "Avatar is required" });
    }

    user.avatar = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    };
    await user.save();

    res.status(200).json({ message: "Avatar uploaded successfully" });
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

export const getAvatar = async (req, res) => {
  try {
    const user = req.user;
    if (!user.avatar.data) {
      return res.status(404).json({
        success: false,
        message: "Avatar not found",
      });
    }
    res.set("Content-Type", user.avatar.contentType);
    res.send(user.avatar.data);
  } catch (error) {
    throw new Error("Unable to fetch avatar");
  }
};

export const deleteAvatar = async (req, res) => {
  try {
    const user = req.user;
    if (!user.avatar.data) {
      return res.status(404).json({
        success: false,
        message: "Avatar not found.",
      });
    }
    user.avatar.data = null;
    user.avatar.contentType = null;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Avatar deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete avatar due to server error.");
  }
};

export const defaultAvatar = async (req, res) => {
  try {
    const { avatar } = await DefaultAvatar.findOne();
    res.set("Content-Type", avatar.contentType);
    res.send(avatar.data);
  } catch (error) {}
};

export const changePassword = async (req, res) => {
  try {
    const user = req.user;
    const { oldPassword, newPassword } = req.body;
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: true,
        message: "Incorrect Password",
      });
    }
    user.password = newPassword;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (error) {
    throw new Error("Failed to change password. Please try again later.");
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const isOTPcorrect = await isOtpValid(email, otp, false);
    console.log({ isOTPcorrect });
    if (!isOTPcorrect) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP. Please try again.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "OTP verified successfully. You can now reset your password.",
    });
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

export const sendOtpForForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email, isDeleted: false });
    // console.log("user", user);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    await sendOtp(
      res,
      email,
      `Your OTP to reset your ${process.env.APP_NAME} password`,
      "./templates/forgotPasswordOTP.html",
    );
  } catch (error) {
    throw new Error("Failed to send OTP. Please try again later.");
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;
    const isOTPcorrect = await isOtpValid(email, otp);
    if (!isOTPcorrect) {
      next(new Error());
    }
    const user = await User.findOne({ email, isDeleted: false });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    user.password = newPassword;
    await user.save();
    return res.status(200).json({
      success: true,
      message:
        "Your password has been reset successfully. Please use your new password to access your account.",
    });
  } catch (error) {}
};

export const getUserprofile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: req.user,
    });
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};
