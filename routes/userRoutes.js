import express from "express";
import { upload } from "../middlewares/multer.js";
import {
  changePassword,
  createAccount,
  defaultAvatar,
  deleteAvatar,
  deleteUser,
  forgotPassword,
  getAvatar,
  getUserprofile,
  login,
  logout,
  logoutAll,
  sendOtpForForgotPassword,
  sendOtpForSignUp,
  uploadAvatar,
  verifyOtp,
} from "../controllers/userController.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const router = express.Router();

router.post("/signup", createAccount);
router.post("/signup-otp", sendOtpForSignUp);
router.post("/login", login);
router.post("/logout", checkAuth, logout);
router.delete("/", checkAuth, deleteUser);
router.post("/avatar", checkAuth, upload.single("avatar"), uploadAvatar);
router.get("/avatar", checkAuth, getAvatar);
router.delete("/avatar", checkAuth, deleteAvatar);
router.post("/logout-all", checkAuth, logoutAll);
router.post("/change-password", checkAuth, changePassword);
router.post("/forgot-password", forgotPassword);
router.get("/profile", checkAuth, getUserprofile);
router.post("/forgot-password-otp", sendOtpForForgotPassword);
router.post("/verify-otp", verifyOtp);
router.get("/default-avatar", defaultAvatar);

export default router;
