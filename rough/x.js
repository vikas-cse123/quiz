//app.js

//config:
// db.js



//data:
// seed.js







const isOtpValid = async (email, otp) => {
  try {
    const otpObj = await OTP.findOne({ email });

    if (!otpObj) return false;

    // Compare hashed OTP (recommended)
    const isMatch = otpObj.otp === otp; // or bcrypt.compare(otp, otpObj.otpHash)

    if (!isMatch) return false;

    // Check expiration
    if (otpObj.expiresAt < new Date()) return false;

    return true;

  } catch (err) {
    console.error("OTP validation error:", err);
    throw new Error("Server error during OTP validation");
  }
};
