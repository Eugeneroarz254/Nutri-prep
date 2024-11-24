import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordToken } from "../features/user/userSlice";
import { toast } from "react-toastify";

const emailSchema = yup.object({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email Address is Required"),
});

const Forgotpassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Select the relevant pieces of state from the Redux store
  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);
  console.log({ isLoading, isError, isSuccess, message });
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: emailSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(forgotPasswordToken(values)).unwrap();
      } catch (error) {
        console.error("Failed to send reset password email:", error);
      }
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password reset email sent successfully!");
    }
  
    if (isError) {
      toast.error(message || "Something went wrong!");
    }
  }, [isSuccess, isError, message, navigate]);
  

  return (
    <>
      <Meta title={"Forgot Password"} />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Reset Your Password</h3>
              <p className="text-center mt-2 mb-3">
                We will send you an email to reset your password
              </p>
              <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                <CustomInput 
                  type="email" 
                  name="email" 
                  placeholder="Email"
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  value={formik.values.email} 
                />
                <div className="error text-center">
                  {formik.touched.email && formik.errors.email}
                </div>

                <div>
                  <div className="mt-3 d-flex justify-content-center flex-column gap-15 align-items-center">
                    <button className="button border-0 forgot-password-btn" type="submit" disabled={isLoading}>
                      {isLoading ? "Submitting..." : "Submit"}
                    </button>
                    <Link to="/login" className="cancel-btn">Cancel</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Forgotpassword;
