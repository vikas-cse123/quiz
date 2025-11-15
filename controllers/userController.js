import OTP from "../model/OTP.js";
import Session from "../model/Session.js";
import User from "../model/User.js";
import { sendEmail } from "../sendEmailService.js";
import { readFile } from "fs/promises";

export const sendOtp = async (req, res) => {
  try {
    const { email, fullname } = req.body;

    const otp = Math.floor(Math.random() * 90000) + 10000;
    const otpTemplateHtml = (await readFile("./templates/otp.html", "utf-8"))
      .replace("{{userName}}", fullname || "")
      .replaceAll("{{appName}}", process.env.APP_NAME)
      .replace("{{otp}}", otp)
      .replace("{{year}}", new Date().getFullYear());

    await sendEmail(
      email,
      "Your OTP Code for Account Verification",
      otpTemplateHtml,
    );

    const existingOTP = await OTP.findOne({ email });
    console.log("existingOTP", existingOTP);
    if (existingOTP) {
      existingOTP.otp = otp;
      existingOTP.createdAt = Date.now();
      await existingOTP.save();
    } else {
      OTP.create({ otp, email });
    }

    return res.status(201).json({
      success: true,
      message: `OTP sent successfully to ${email}.`,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const createAccount = async (req, res) => {
  try {
    console.log("req.body", req.body);
    const { username, email, otp } = req.body;
    const existingUser = await User.findOne({ username });
    console.log("existingUser", existingUser);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "This username isn't available. Please try another.",
      });
    }

    const existingUserWithThisEmail = await User.findOne({ email });
    console.log("existingUserWithThisEmail", existingUserWithThisEmail);
    if (existingUserWithThisEmail) {
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

    const user = await User.create(req.body);
    console.log("user", user);

    return res.status(201).json({
      success: true,
      message: `Account created successfully`,
    });
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      const errorData = {};
      for (const key in error.errors) {
        errorData[error.errors[key].path] = error.errors[key].message;
      }
      return res.status(400).json({ success: false, message: errorData });
    }

    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  console.log(req.headers);
  console.log(req.cookies);
  try {
    const { password, usernameOrEmail } = req.body;
    let user;
    if (usernameOrEmail.includes("@")) {
      user = await User.findOne({ email: usernameOrEmail });
    } else {
      user = await User.findOne({ username: usernameOrEmail });
    }
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials.." });
    }
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials." });
    }

    const existingSession = await Session.findOne({
      _id: req.cookies.sessionId,
    });
    console.log(existingSession, "existingSession");
    console.log(existingSession?.id, "existingSession id id");
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
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
