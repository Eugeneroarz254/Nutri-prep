import React, { useState } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Container from '../components/Container'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile } from '../features/user/userSlice'
import {FiEdit} from "react-icons/fi"
import { Link } from 'react-router-dom'


const Profile = () => {
 
    
  return (
      <>
      <BreadCrumb title='My Profile'/>
    <section className='profile-container px-5 py-3 '>
      <h3 className='text-center profile-header bg-white'>My account</h3>
      <div className='my-account  d-grid'>

      <Link to="/my-profile" className='my-account-details'>
            <div className='d-flex w-100 justify-content-center my-account-img'>
              <img 
              src='https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/account._CB660668669_.png'
              alt="image"/>
            </div>
    <h3 className='text-center'>Profile</h3>
      
       <p className='text-center'>Manage, add, or remove user <br/>
        profiles for personalized experiences</p>
               
      </Link>
      
      <Link 
      to="/edit-profile"
      className='my-account-details'>
      <div className='d-flex w-100 justify-content-center my-account-img'>
              <img 
              src='https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/security._CB659600413_.png'
              alt="image"/>
            </div>
            <div className=' '>

              <h3 className='text-center'>Login & Security</h3>
                <p className='text-center'>Edit Login, name and mobile<br/>
               number </p>
                   </div>
                   </Link>


                   <Link 
                   to="/my-orders"
                   className='my-account-details'>
      <div className='d-flex w-100 justify-content-center my-account-img'>
              <img 
              src='https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/order._CB660668735_.png'
              alt="image"/>
            </div>
        <h3 className='text-center'>Orders</h3>
                <p className='text-center'>Track, return, cancel an order, <br/>
                download invoice or buy again</p>
              </Link>
         
              <Link to="/address" className='my-account-details'>
              <div className='d-flex w-100 justify-content-center my-account-img'>
              <img 
              src='https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/fshub/fshub_address_book._CB613924977_.png'
              alt="image"/>
            </div>
              <h3 className='text-center'>Addresses</h3>
                <p className='text-center'>Edit, remove or set default<br/>
               address </p>   
                   </Link>
                   <Link to="/wishlist" className='my-account-details'>
              <div className='d-flex w-100 justify-content-center my-account-img'>
              <img 
              src='https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/fshub/11_lists._CB654640573_.png'
              alt="image"/>
            </div>
              <h3 className='text-center'>Wishlist</h3>
                <p className='text-center'>View your favorite products list here</p> 
                </Link>
               <Link to="/contact" className='my-account-details'>
              <div className='d-flex w-100 justify-content-center my-account-img'>
              <img 
              src='https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/contact_us._CB659962323_.png'
              alt="image"/>
            </div>
            <h3 className='text-center'>Contact Us</h3>
          <p className='text-center'>
            Send us an enquiry and one of our  <br/>  team members will reach out to you as soon as possible.
          </p>
 
               </Link>
              </div>

    </section>
        
    
      </>
  )
}

export default Profile