const expressAsyncHandler = require("express-async-handler");
const OtpModel = require("../models/OtpModel");
const sendSignupOTPEmail = require("./sendSignupOTPEmail");

const resendOTPEmail = expressAsyncHandler(async (req, res) => {
  try {
    const { email, firstname, lastname, mobile, password } = req.body; // Get the user's data from the request body

    // Check if an OTP document with the email already exists, and remove it if it does
    let existingOTPDocument = await OtpModel.findOne({ email });
    if (existingOTPDocument) {
      await existingOTPDocument.remove();
    }

    // Generate a new OTP here (you can use your OTP generation logic)
    const generateNewOTP = () => {
      const otpLength = 6;
      let otp = '';
      for (let i = 0; i < otpLength; i++) {
        otp += Math.floor(Math.random() * 10);
      }
      return otp;
    };

    // Define expiration time (10 minutes in milliseconds)
const otpExpirationTime = 5 * 60 * 1000;

    // Create a new OTP document
    existingOTPDocument = new OtpModel({
      firstname: firstname,
      lastname: lastname,
      email: email,
      mobile: mobile,
      password: password,
    });

    // Generate and set a new OTP
    existingOTPDocument.otp = generateNewOTP();
    existingOTPDocument.expiration = new Date(Date.now() + otpExpirationTime);

    // Save the new OTP document in the database
    await existingOTPDocument.save();

    // Send the OTP to the email
    await sendSignupOTPEmail({
      firstname: existingOTPDocument.firstname,
      lastname: existingOTPDocument.lastname,
      email: existingOTPDocument.email,
      mobile: existingOTPDocument.mobile,
      password: existingOTPDocument.password,
      to: email, // This should be correct
      otp: existingOTPDocument.otp,
    });

    // Respond with a success message indicating that OTP has been resent
    res.status(200).json({ message: "OTP has been resent to your email" });
  } catch (error) {
    // Handle any errors that occurred during OTP resending
    console.error("Error resending OTP:", error);
    res.status(500).json({ message: "Error resending OTP" });
  }
});

module.exports = resendOTPEmail;
