import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import newsletter from "../images/newsletter.png";
import { subscribeNewsletter } from "../features/user/userSlice";
import { useMediaQuery } from "react-responsive";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { BsSendFill } from "react-icons/bs";
import { FaCcVisa } from "react-icons/fa";
import { FaCcPaypal } from "react-icons/fa";
import { FaRegCreditCard } from "react-icons/fa6";
import mpesaLogo from "../images/mpesa-logo.png"
import Container from "./Container";
import logo from "../images/wine-logo-x.png"

const Footer = () => {
 
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.user || { message: null });
  const isDesktop = useMediaQuery({ minWidth: 768 });


  return (
    <>
    
      <Container class1="footer-wrapper">
  <div className="footer-content">
    <div className="footer-left">
      <div className="footer-image-container">
 
       <h2>Nutriprep</h2>
      </div>
      
      <p>Address: Street 133/2 Nairobi, Kenya </p>
      <p>Email: info.contact@gmail.com</p>
      <p>Phone: (00) 123 456 789</p>
    </div>
    <div className="footer-middle">
      <ul>
        <li>My Account</li>
        
        <li>Register</li>
        <li>Login</li>
      </ul>
      <ul>
        <li>Wishlist</li>
        <li>Help Center</li>
        <li>Report Spam</li>
        <li>FAQs</li>
      </ul>
    </div>
    <div className="footer-right">
 
<div className="social_icons d-flex align-items-center gap-30 ">
            <a className="text-white" href="#">
              <FaInstagram className=" social-icon" />
            </a>
            <a className="text-white" href="#">
              <FaXTwitter className=" social-icon" />
            </a>
            <a className="text-white" href="">
              <FaFacebook className=" social-icon" />
            </a>
          </div>

    </div>
  </div>
  <div className="footer-bottom">

    <p>Copyright Nutriprep © 2024. All rights reserved.</p>
  </div>
</Container>

    </>
  );
  };

export default Footer;