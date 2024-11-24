import React, { useState } from 'react'
import Container from './Container'
import { subscribeNewsletter } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';


const Newsletter = () => {
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const { message } = useSelector((state) => state.user || { message: null });

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
          dispatch(subscribeNewsletter(email)); 
          setEmail(""); 
        }
      }; 


  return (
    <>

<Container class1="home-wrapper-1 py-2 main-wrapper">
  <div className="newsletter-wrapper">
    <div className="newsletter-header">
      <h2>Subscribe To Our Newsletter</h2>
      <span>Subscribe to our email list</span>
    </div>
    <form  onSubmit={handleSubscribe}  className="newsletter-form">
    <input
       type="email"
       
       placeholder="email"
       aria-label="Your Email Address"
       aria-describedby="basic-addon2"
       value={email}
       onChange={(e) => setEmail(e.target.value)}
       required
      />
      <div className="subscribe-button">
        <button type="submit">Subscribe</button>
      </div>
    </form>

    {message && <div className="error-message text-danger mt-2">{message}</div>}

  </div>
</Container>

    </>
  )
}

export default Newsletter