import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, resetLoggedOut } from "../features/user/userSlice";
import Meta from "../components/Meta";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import googleImg from "../images/google.png";
import { base_url } from "../utils/axiosConfig";
import { toast } from "react-toastify";

const loginSchema = yup.object({
  email: yup.string().email("Email should be valid").required("Email Address is Required"),
  password: yup.string().required("Password is Required"),
});

const Login = () => {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loadLogin, setLoadLogin] = useState(false);

  useEffect(() => {
    if (authState.isError) {
      setLoadLogin(false); // Reset loading state if there's an error
    }

    if (authState.isSuccess && authState.user && !authState.isError) {
      // Navigate to home after successful login
      const timer = setTimeout(() => {
        window.location.href = '/'; 
      }, 1500); 

      return () => clearTimeout(timer); // Cleanup the timer on component unmount or before running the effect again
    }
  }, [authState, navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      setLoadLogin(true);
      dispatch(loginUser(values));
    },
  });

  const googleAuth = () => {
    dispatch(resetLoggedOut()); 
    window.open(`${base_url}user/google/callback`, "_self");
  };

  return (
    <>
    <Meta 
      title="Login - Best Sellers Shop"
      description="Access your account at The Best Sellers Shop to manage orders, view your wishlist, and check out faster. Login to enjoy a personalized shopping experience."
      keywords="login, account access, Best Sellers Shop, customer account, order management, wishlist"
      canonical="https://www.bestsellersshopke.com/login"
    />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Login</h3>
              <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                <CustomInput
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  value={formik.values.email}
                />
                <div className="error">
                  {formik.touched.email && formik.errors.email}
                </div>
                <CustomInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                  value={formik.values.password}
                />
                <div className="error">
                  {formik.touched.password && formik.errors.password}
                </div>
                <div>
                <a href="/forgot-password">Forgot Password?</a>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button login-btn border-0" type="submit" disabled={loadLogin}>
                      {loadLogin ? "Loading..." : "Login"}
                    </button>
                  </div>
                </div>
              </form>
              {/* Uncomment the following section if you want to include Google login */}
              {/* <div className="or-container">
                <div className="or-hr"></div>
                <span className="or-text">OR</span>
                <div className="or-hr"></div>
              </div>
              <div className="google-btn-container">
                <button className="google_btn" onClick={googleAuth}>
                  <img src={googleImg} alt="google icon" />
                  <span>Continue with Google</span>
                </button>
              </div> */}
              <div className="signup-note mt-5">
                <p>
                  Don't have an account? &nbsp;
                  <Link to="/signup" className="signup-element">
                    SignUp
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
