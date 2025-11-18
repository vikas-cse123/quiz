import OTP from "../model/OTP.js";

export const isOtpValid = async (email, otp) => {
  try {
    const otpObj = await OTP.findOne({ email, otp });
    //now i am deleting otp for all time. but after some time i will take an argument
    if(otpObj){
      const a =  await otpObj.deleteOne()
      console.log({a});
        
    }
    return otpObj ? true : false

  } catch (error) {

    console.log(error);
    return false
  }
};