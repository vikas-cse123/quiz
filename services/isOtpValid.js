import OTP from "../model/OTP.js";

export const isOtpValid = async (email, otp,isDeleteOtpDocument=true) => {
  try {
    const otpObj = await OTP.findOne({ email, otp });
    console.log({otpObj});
    //now i am deleting otp for all time. but after some time i will take an argument
    if (otpObj && isDeleteOtpDocument) {
      const a = await otpObj.deleteOne();
      console.log({ a });
    }
    return otpObj ? true : false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
