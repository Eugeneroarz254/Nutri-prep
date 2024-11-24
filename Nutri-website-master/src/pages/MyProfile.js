import React from 'react';
import BreadCrumb from '../components/BreadCrumb';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ProfileBreadCrumb from '../components/ProfileBreadCrumb';
import { FaUserCircle } from "react-icons/fa";
import { LiaShippingFastSolid } from "react-icons/lia";
import { FiEdit } from 'react-icons/fi';
import Meta from '../components/Meta';

const MyProfile = () => {
    const authState = useSelector(state => state.auth);
    const user = authState?.user;
    const address = authState?.address; // Assuming the address is stored here
   const navigate = useNavigate();

    const handleUser = async () => {
      navigate("/edit-profile")
    }

    const handleAddress = async () => {
        navigate("/address")
      }

    return (
        <>
              <Meta title={"My Profile"} />

            <ProfileBreadCrumb title="My Profile" />
            <section className="my-profile-container px-5 py-3">
                <div>
                    <h2>My Profile</h2>
                    
                    <div>
                    <div>
                                    <FaUserCircle className='my-profile-icon' />
                                </div>
                        <h1>User Information</h1>

                        <div className='profile-element'>
                            <div>
                
                                <div>
                                    <div className='d-flex'>
                                        <b>User ID:&nbsp;</b> 
                                        <p>{user?._id || "Not available"}</p>
                                    </div>
                                    <div className='d-flex'>
                                        <b>User Name:</b>
                                        <p>{user?.firstname + " " + user?.lastname || "Not available"}</p>
                                    </div>
                                    <div className='d-flex'>
                                        <b>Email Address:</b>
                                        <p>{user?.email || "Not available"}</p>
                                    </div>
                                    <div className='d-flex'>
                                        <b>Phone Number:</b>
                                        <p>{user?.mobile || "Not available"}</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                            <FiEdit
                           onClick={() => handleUser()}

                            className="fs-3"/>

                            </div>
                        </div>
                    </div>
  
                    <div className='mt-3'>
                    <div>
                                    <LiaShippingFastSolid  className='my-profile-icon' />
                                </div>
                        <h1>Shipping Information</h1>

                        <div className="profile-element">
                            <div>
             
                                <div>
                                    <b>Region:</b> {address?.region || "None"}
                                    <br />
                                    <b>First Name:</b> {address?.firstName || "None"}
                                    <br />
                                    <b>Address:</b> {address?.address || "None"}
                                    <br />
                                    <b>Town/Area:</b> {address?.town || "None"}
                                    <br />
                                    <b>Phone Number:</b> {address?.phone || "None"}
                                    <br />
                                    <b>Additional Phone Number:</b> {address?.additionalNumber || "None"}

                                </div>
                            </div>
                            <div>
                                <FiEdit
                                 onClick={() => handleAddress()}
                                className="fs-3"/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default MyProfile;
