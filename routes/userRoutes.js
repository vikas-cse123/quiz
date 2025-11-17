import express from "express";
import { upload } from "../middlewares/multer.js";
import {
  createAccount,
  deleteUser,
  getAvatar,
  login,
  logout,
  sendOtp,
  uploadAvatar,
} from "../controllers/userController.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const router = express.Router();

router.post("/signup", createAccount);
router.post("/signup-otp", sendOtp);
router.post("/login", login);
router.post("/logout", checkAuth,logout);
router.delete("/", checkAuth, deleteUser);
router.post("/avatar", checkAuth, upload.single("avatar"), uploadAvatar);
router.get("/avatar", checkAuth, getAvatar);
export default router;
