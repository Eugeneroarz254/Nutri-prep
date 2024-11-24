import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';  // Import useNavigate instead of useHistory
import CustomInput from "../components/CustomInput";

const emailVerificationSchema = yup.object({
  otp: yup.string().required("OTP is required"),
});

const EmailVerification = ({ onSubmit, isOtpSent, onResendOTP, isSuccess }) => {
  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: emailVerificationSchema,
    onSubmit: (values) => onSubmit(values),
  });

  const [remainingTime, setRemainingTime] = useState(5 * 60); // Set initial remaining time to 5 minutes
  const [isOtpExpired, setIsOtpExpired] = useState(false);

  const navigate = useNavigate();  // Use useNavigate instead of useHistory

  useEffect(() => {
    if (isSuccess) {
      toast.info("User has been created successfully!");
      navigate("/"); // Use navigate instead of history.push
    }
  }, [isSuccess, navigate]);
  

  useEffect(() => {
    if (isOtpSent) {
      const updateRemainingTime = () => {
        if (remainingTime > 0) {
          setRemainingTime((prevRemainingTime) => prevRemainingTime - 1);
        } else {
          setIsOtpExpired(true);
        }
      };

      const timer = setInterval(updateRemainingTime, 1000);

      return () => clearInterval(timer);
    }
  }, [remainingTime, isOtpSent]);

  const handleResendOTP = () => {
    onResendOTP();
    setRemainingTime(5 * 60); // Reset remaining time to 5 minutes
    setIsOtpExpired(false);
  };

  const formattedTime = `${Math.floor(remainingTime / 60)}:${(remainingTime % 60)
    .toString()
    .padStart(2, "0")}`;

  return (
    <>
    <div className="email-verification-wrapper ">
      <h1>Email Verification</h1>
      <p>Enter the 6-digit Verifification code sent to <br></br>&#10029;&#10029;&#10029;&#10029;&#10029;&#10029;&#10029;&#10029;&#10029;&#10029;&#10029;</p>
    </div>
        <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
      <CustomInput
        type="text"
        name="otp"
        placeholder="Enter OTP"
        value={formik.values.otp}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <div className="error">{formik.touched.otp && formik.errors.otp}</div>
      <div className="d-flex justify-content-between align-items-center">
        {isOtpSent && !isOtpExpired ? (
          <div>{`OTP Expiry Time: ${formattedTime}`}</div>
        ) : null}
        {isOtpSent && isOtpExpired ? (
          <div className="d-flex justify-content-between align-items-center" style={{ width: "100%" }}>
            <div>OTP Expired</div>
            <button type="button" onClick={handleResendOTP} className="button border-0">
              Resend OTP
            </button>
          </div>
        ) : null}
        {isOtpSent && !isOtpExpired ? (
          <button type="submit" className="button border-0">
            Verify Email
          </button>
        ) : null}
      </div>
    </form>
    </>

  );
};

export default EmailVerification;
