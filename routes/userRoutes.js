import express from "express";
import {
  createAccount,
  login,
  sendOtp,
} from "../controllers/userController.js";
const router = express.Router();

router.post("/signup", createAccount);

router.post("/signup-otp", sendOtp);
router.post("/login", login);

export default router;
