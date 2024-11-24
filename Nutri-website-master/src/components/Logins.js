
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaUserCheck } from "react-icons/fa";
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, setLoggedOut } from "../features/user/userSlice";
import { BiSolidUser } from "react-icons/bi";

const Logins = ({ isAuthenticated }) => {
  const dispatch = useDispatch();
  const authState = useSelector(state => state?.auth);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      dispatch(setLoggedOut())
      window.location.href = '/'; 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const user = authState?.user?.user ? authState?.user?.user : authState?.user;

  return (
    <div className="logins">
      <Dropdown show={showDropdown} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Dropdown.Toggle variant="primary" id="dropdown-basic" className="custom-dropdown-toggle">
          <Link
            to={user === null ? "/login" : "/my-account"}
            className="d-flex login-container align-items-center text-white"
          >
            {user === null ? (
              <>
                <p className="mb-0 d-flex login-auth">
                  Sign In 
                </p>
                <FaUser className="login-icon1" />
              </>
            ) : (
              <>
                <p className="mb-0 login-auth">{user?.firstname}</p>
                <BiSolidUser className="login-icon" />
              </>
            )}
          </Link>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {user == null && (
            <div className="logout-btn-container">
              <Link to="/login" className="border border-0 w-100 justify-content-center signup-btn" type="button">
                Sign In
              </Link>
            </div>
          )}
          {user !== null && (
            <>
              <Dropdown.Item href="/my-orders">My Orders</Dropdown.Item>
              <Dropdown.Item href="/wishlist">Wishlist</Dropdown.Item>
              <Dropdown.Item href="/my-profile">My Address</Dropdown.Item>
              <Dropdown.Item href="/edit-profile">Login & Security</Dropdown.Item>
              <Dropdown.Item href="/contact">Contact Us</Dropdown.Item>
              <Dropdown.Divider />
              <div className="logout-btn-container">
                <button onClick={handleLogout} className="border border-0 logout-btn w-100 justify-content-center" type="button">
                  Sign Out
                </button>
              </div>
            </>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default Logins;
