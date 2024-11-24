import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
 import { useDispatch, useSelector } from "react-redux";
 import 'react-bootstrap-typeahead/css/Typeahead.css';
 import { getUserCart, logoutUser } from "../features/user/userSlice";
import {AiOutlineMenu} from "react-icons/ai"
import { MediaSidebarData } from './MediaSidebarData';
import MediaSidebarItem from './MediaSidebarItem';
import {RxCross2} from "react-icons/rx"
 import {FaUserCheck} from "react-icons/fa";
import {FaUser} from "react-icons/fa"

 import Logins from "./Logins";
 import { MdEmail } from "react-icons/md";
 import Container from "./Container";
 import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FiMenu } from "react-icons/fi";


const Header = () => {
    const authState = useSelector(state => state?.auth)
  const location = useLocation();
   
  const showSideBar = () => {
    setSidebar(!sidebar);
    document.body.classList.toggle('sidebar-active', !sidebar);
  };
  
  const [sidebar, setSidebar] = useState(false);



  return (
    <>

     <Container class1="header-wrapper">
     <header className="header-top-strip ">
        <div className="container-xxl">
          <div className="row free-shipping">
            <div className="col-6 d-flex align-items-center text-white location-1">
            <MdEmail className="email-icon" />
              <p className="text-white mb-0">
              Hello@Nutriprep.com
              </p>
            </div>
            <div className="col-6">
            <div className="social-icons d-flex align-items-center gap-30 ">
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

        </div>
      </header>
 
      <header className="header-upper py-3 fixed-header">
        <div className="container-xxl">
          <div className="row  align-items-center">
            <div className="col-2 h-upper-links">
              <div className="electro-logo d-flex align-items-center">

              <AiOutlineMenu className="menu-btn" onClick={showSideBar}/>

   
              <div className={sidebar ? 'sidebar active' : 'sidebar'}>
  <div className='sidebar-header'>
    Nutriprep
    <RxCross2 className='cross-btn'onClick={showSideBar}/>
    
  </div>
       {MediaSidebarData.map((item,index) =>  <MediaSidebarItem key={item.id} item={item} onClick={showSideBar}/>)}
      </div>
      {sidebar && <div className="overlay" onClick={showSideBar}></div>}

              <Link to="/" className="logo-img-container">
      
                <h1 className="text-white"> Nutriprep</h1>
              </Link>
              </div>
              <div className="col-5 h-upper-links2">
              <div className="header-upper-links2 gap-10  d-flex align-items-center ">
        
  
              <div className="logins">
              <Link
                to={authState?.user ? "/my-account" : "/login"}
                className="d-flex login-container align-items-center text-white"
              >
                {authState?.user ? (
                  <>
                    <p className="mb-0 login-auth">{authState.user.firstname}</p>
                    <FaUserCheck className="login-icon" />
                  </>
                ) : (
                  <>
                    <p className="mb-0 login-auth">Log In</p>
                    <FaUser className="login-icon1" />
                  </>
                )}
              </Link>

              </div>

               
         
              
              </div>
            </div>
            </div>
            <div className="col-5 menu-links-container">
            <div className="menu-links">
            <div className="d-flex align-items-center menu-links-nav">
              <NavLink
                className={({ isActive }) =>
                  isActive || window.location.pathname === "/"
                    ? "nav-link active-link"
                    : "nav-link"
                }
                to="/"
              >
                Home
              </NavLink>
              <NavLink
                className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")}
                 
              >
                Recipies
              </NavLink>
              <NavLink
                className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")}
                
              >
                Services
              </NavLink>
              <NavLink
                className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")}
                 
              >
              About
              </NavLink>
            </div>
          </div>

            </div>
            <div className="col-5 h-upperlinks1">
              <div className="header-upper-links d-flex align-items-center justify-content-end">
           
             
              <FiMenu className="menu-icon"/>

              
            
              </div>
            </div>
          </div>
        </div>
      </header>
     </Container>


    </>
  );
};

export default Header;