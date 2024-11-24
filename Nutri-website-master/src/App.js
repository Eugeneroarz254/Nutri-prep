import React, { useState, useEffect } from 'react';
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OurStore from "./pages/OurStore";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Forgotpassword from "./pages/Forgotpassword";
import Signup from "./pages/Signup";
import Resetpassword from "./pages/Resetpassword";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPloicy from "./pages/RefundPloicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import TermAndContions from "./pages/TermAndContions";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { PrivateRoutes } from "./routing/PrivateRoutes";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Address from "./pages/Address";
import Layout3 from "./components/Layout3";

import { fetchUserData, setLoggedOut } from './features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import TodaysDeals from './pages/Today\'sDeals';

import NewArrivals from './pages/NewArrivals';
import Faq from './pages/Faq';
import MyProfile from './pages/MyProfile';

import logo from "./images/wine-logo-x.png"
import Categories from './pages/Categories';
import TypePage from './pages/TypePage';
import BrandsPage from './pages/BrandsPage';

function App() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth.user);
  const isLoggedOut = useSelector((state) => state.auth.isLoggedOut);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
  
    return () => clearTimeout(timeout);
  }, []);
  

  
  useEffect(() => {
    if (!loading && !user && isLoggedOut) { 
      dispatch(fetchUserData());
    }
  }, [dispatch, user, loading, isLoggedOut]);
  

{/*  useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault();  // Disable right-click
    };

    const handleCopy = (event) => {
      event.preventDefault();  // Disable copy
    };

    const handleSelectStart = (event) => {
      event.preventDefault();  // Disable text selection
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('selectstart', handleSelectStart);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('selectstart', handleSelectStart);
    };
  }, []);*/}
  
  return (
    <>
      <BrowserRouter>

      {loading ? (
        <div className="loader position-relative ">
          <div className='ring'></div>
          <img 
          src={logo}
          alt="logo"
          loading="lazy"
          />
         
        </div>
     ) : (
        <>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="faqs" element={<Faq />} />
            <Route path="my-profile" element={<MyProfile />} />

            <Route path="contact" element={<Contact />} />
            <Route path="product" element={<OurStore />} />
            <Route path="product/:id" element={<SingleProduct />} />
            <Route path="/:type/category/:category" element={<Categories />} />
            <Route path="/:type/brand/:brand" element={<BrandsPage />} />
           <Route path="/:type" element={<TypePage />} />

            <Route path="cart" element={<PrivateRoutes><Cart/></PrivateRoutes>} />
            <Route path="my-orders" element={<PrivateRoutes><Orders/></PrivateRoutes>} />
            <Route path="my-account" element={<PrivateRoutes><Profile/></PrivateRoutes>} />
            <Route path="checkout" element={<PrivateRoutes><Checkout /></PrivateRoutes>} />
            <Route path="wishlist" element={<PrivateRoutes><Wishlist /></PrivateRoutes>} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="refund-policy" element={<RefundPloicy />} />
            <Route path="shipping-policy" element={<ShippingPolicy />} />
            <Route path="term-conditions" element={<TermAndContions />} />
            <Route path="edit-profile" element={<EditProfile />} />
            <Route path="address" element={<Address />} />
  
            
            <Route path="new-arrivals" element={<NewArrivals />} />

            <Route path="today's-deals" element={<TodaysDeals />} />




          </Route>
  

   
          <Route path="/" element ={<Layout3/>}>

          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgot-password" element={<Forgotpassword />} />
          <Route path="reset-password/:token" element={<Resetpassword />} />
          </Route>

        </Routes>
          </>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
