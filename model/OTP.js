import { Schema, model } from "mongoose";
const otpSchema = new Schema({
  otp: {
    type: String,
    minLength: 5,
    required: true,
  },

  email: {
    type: String,
    required: [true, "Email address is required."],
    lowercase: true,
    trim: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please enter a valid email address.",
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300,
  },
});

const OTP = model("OTP", otpSchema);
export default OTP;
