const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");
const OtpModel = require("../models/OtpModel");
const path = require("path");

const sendSignupOTPEmail = asyncHandler(async (data, req, res, isSignup = true) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "synergyvines@gmail.com",
      pass: "qrnxkjjeeoctxkxu",
    },
  });

  // Generate a new OTP (for sign-up or reset)
  const OTP = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP

  // Calculate the expiration time for the OTP (e.g., 10 minutes from now)
  const expirationTime = new Date(Date.now() + 5 * 60 * 1000); // OTP expires in 5 minutes

  // Create a new OTP document with user data and OTP
  const otpDocument = new OtpModel({
    firstname: data.firstname, // Replace 'data.firstname' with the actual firstname
    lastname: data.lastname, // Replace 'data.lastname' with the actual lastname
    email: data.to, // Save the user's email as the reference
    mobile: data.mobile, // Replace 'data.mobile' with the actual mobile number
    password: data.password, // Replace 'data.password' with the actual password
    otp: OTP,
    expiration: expirationTime,
    isSignup: isSignup, // Use a flag to distinguish between sign-up and reset
  });

  // Save the new OTP document to the database
  await otpDocument.save();

  // Set the email subject based on whether it's sign-up or reset
  const subject = isSignup ? "Sign Up OTP" : "Reset OTP";

  // Set the email text content based on whether it's sign-up or reset
  const emailText = isSignup
    ? `Your OTP for sign-up is: ${OTP}. This OTP will expire at: ${expirationTime}`
    : `Your OTP for reset is: ${OTP}. This OTP will expire at: ${expirationTime}`;


  // Send the email with the image attachment
  let info = await transporter.sendMail({
    from: '"Synergy Vines" <abc@gmail.com>',
    to: data.to,
    subject: subject,
    text: emailText,
    html: `
      <div style="text-align: center;">
        <p style="font-size: 18px; color: #333; text-align: left;">Hi, <br/> <br/> 
          Someone ${
            isSignup ? "tried to sign up for a Toptier Office account" : "requested an OTP reset"
          } with ${data.to}. If it was you, enter this confirmation code in the app.
          <br/> <br/> 
          ${emailText}
        </p>
      </div>
    `
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
});

module.exports = sendSignupOTPEmail;
