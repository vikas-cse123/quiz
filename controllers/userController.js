import OTP from "../model/OTP.js";
import Session from "../model/Session.js";
import User from "../model/User.js";
import { sendEmail } from "../utils/sendEmailService.js";
import { readFile } from "fs/promises";

export const sendOtp = async (req, res) => {
  try {
    const { email, name } = req.body;
    const existingUser = await User.findOne({ email, isDeleted: false });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Account already exists with this email.",
      });
    }

    const otp = String(Math.floor(Math.random() * 90000) + 10000);
    const otpTemplateHtml = (await readFile("./templates/otp.html", "utf-8"))
      .replaceAll("{{userName}}", name || "")
      .replaceAll("{{appName}}", process.env.APP_NAME)
      .replaceAll("{{otp}}", otp)
      .replaceAll("{{year}}", new Date().getFullYear());

    await sendEmail(
      email,
      "Your OTP Code for Account Verification",
      otpTemplateHtml
    );

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

    const otpObj = await OTP.findOne({ email, otp });
    if (!otpObj) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP. Please try again.",
      });
    }

    await User.create(req.body);
    await otpObj.deleteOne();

    return res.status(201).json({
      success: true,
      message: `Account created successfully`,
    });
  } catch (error) {
    console.log("aaaa", error);
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
    const { password, email,isLogoutOtherDevices } = req.body;
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
    if(isLogoutOtherDevices){
      const r1 = await Session.deleteMany({_id:user.id})
      console.log({r1});
    }
    console.log({user});

    const allSessions = await Session.find({userId:user._id});
    console.log("allSessions", allSessions);
    if (allSessions.length >= 2) {
      return res.status(200).json({message:"Already 2 devcies are logged in "})
    } else {
      const existingSession = await Session.findOne({
        _id: req.cookies.sessionId,
        userId: user._id,
      });

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
