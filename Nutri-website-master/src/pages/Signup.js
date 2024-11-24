import React, { useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, resendOTP, verifyEmailOTP } from "../features/user/userSlice";
import EmailVerification from "../components/EmailVerification";
import { base_url } from "../utils/axiosConfig";
import googleImg from "../images/google.png"

const signUpSchema = yup.object({
  firstname: yup.string().required("First Name is Required"),
  lastname: yup.string().required("Last Name is Required"),
  email: yup
    .string()
    .email("Email Should be valid")
    .required("Email Address is Required"),
  mobile: yup.string().required("Mobile No is Required"),
  password: yup.string().required("Password is Required"),
  confirmPassword: yup.string().required("Confirm Password is Required"),

});

const Signup = () => {
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const authState = useSelector((state) => state.auth);
  const isOtpSent = useSelector((state) => state.auth.isOtpSent);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "", // Add the confirmPassword field
    },
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      try {
        if (values.password !== values.confirmPassword) {
          // If passwords don't match, show an error message and return
          alert("Passwords do not match");
          return;
        }

        // Dispatch the registerUser action
        dispatch(registerUser(values));

        // Show the email verification component
        setShowEmailVerification(true);
      } catch (error) {
        // Handle any errors that occurred during the signup process
        console.error("Error during signup:", error);
      }
    },
  });

 
  const handleEmailVerification = async (values) => {
    try {
      console.log("Values received:", values);
  
      const otpData = values.otp;
  
      const resultAction = await dispatch(verifyEmailOTP(otpData));
  
      if (verifyEmailOTP.fulfilled.match(resultAction)) {

        const successMessage = resultAction.payload;
        console.log("Verification Success:", successMessage);
        navigate("/login"); 
      } else if (verifyEmailOTP.rejected.match(resultAction)) {

        const errorMessage = resultAction.error.message;
        console.error("Verification Error:", errorMessage);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };
  

  const handleResendOTP = async () => {
    try {
      // Get the relevant values from formik
      const { firstname, lastname, email, mobile, password } = formik.values;
  
      // Now you can use these values in your logic
      // Dispatch the resendEmailOTP action
      const resultAction = await dispatch(resendOTP({ firstname, lastname, email, mobile, password }));
  
      if (resendOTP.fulfilled.match(resultAction)) {
        // Handle the successful OTP resend
        const successMessage = resultAction.payload;
        console.log("OTP Resent Successfully:", successMessage);
  
        // You can reset the timer in the EmailVerification component here
        // setShowEmailVerification(true);
      } else if (resendOTP.rejected.match(resultAction)) {
        // Handle the OTP resend error
        const errorMessage = resultAction.error.message;
        console.error("Error Resending OTP:", errorMessage);
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
    }
  };


  const googleAuth = () => {
		window.open(
			`${base_url}user/google/callback`,
			"_self"
		);
	};
  

  return (
    <>
      <Meta 
    title="Sign Up - Best Sellers Shop"
    description="Create an account at The Best Sellers Shop to enjoy personalized shopping, manage your orders, and access exclusive deals. Sign up today for a better shopping experience."
    keywords="sign up, create account, Best Sellers Shop, customer registration, personalized shopping"
    canonical="https://www.bestsellersshopke.com/sign-up"
  />

      <Container class1="signup-wrapper  py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Sign Up</h3>
              {showEmailVerification ? (
                // Show the EmailVerification component if showEmailVerification is true
                <EmailVerification 
                onSubmit={handleEmailVerification}
                isOtpSent={isOtpSent}
                onResendOTP={handleResendOTP}
                />
              ) : (
                <>
                             <form
                  action=""
                  onSubmit={formik.handleSubmit}
                  className="d-flex flex-column gap-15"
                >
                  <CustomInput
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    value={formik.values.firstname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <div className="error">
                    {formik.touched.firstname && formik.errors.firstname}
                  </div>
                  <CustomInput
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    value={formik.values.lastname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <div className="error">
                    {formik.touched.lastname && formik.errors.lastname}
                  </div>
                  <CustomInput
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <div className="error">
                    {formik.touched.email && formik.errors.email}
                  </div>
                  <CustomInput
                    type="tel"
                    name="mobile"
                    placeholder="Mobile Number"
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <div className="error">
                    {formik.touched.mobile && formik.errors.mobile}
                  </div>
                  <CustomInput
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <div className="error">
                    {formik.touched.password && formik.errors.password}
                  </div>

                          <CustomInput
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="error">
                  {formik.touched.confirmPassword && formik.errors.confirmPassword}
                </div>
                  <div>
                    <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                      <button className="button signup-button border-0">Sign Up</button>
                    </div>
                    
  
                  </div>
                </form>
             {/*   <div className="or-container">
            <div className="or-hr"></div><span className="or-text">OR</span>  <div className="or-hr"></div>
          </div>

             <div className="google-btn-container">
              <button className="google_btn" onClick={googleAuth}>
             <img src={googleImg} alt="google icon" />
             <span>Continue with Google</span>
               </button>
              </div> */}                 
                </>
   
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Signup;
