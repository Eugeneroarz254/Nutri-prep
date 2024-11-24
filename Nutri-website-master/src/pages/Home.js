import React, { useEffect, useRef, useState } from "react";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/blogs/blogSlice";
import  {  getAllProducts } from "../features/products/productSlice";
import {  Link, useNavigate } from "react-router-dom";
import { addToWishlist } from "../features/products/productSlice";
import { useMediaQuery } from "react-responsive";
import "react-multi-carousel/lib/styles.css";
import { getAllCovers } from "../features/cover/coverSlice";
import { useParams } from 'react-router-dom';
import { getAllWines } from "../features/wines/wineSlice";
import Meta from "../components/Meta";
import Counter from "../components/Counter";
import about1 from "../images/about-1.jpg"
import about2 from "../images/about-2.jpg"
import { BiPhoneCall } from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import { FaPlay } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { HiSpeakerphone } from "react-icons/hi";
import { GiDiamondTrophy } from "react-icons/gi";
import { MdNoMeals } from "react-icons/md";
import { TbPlant2 } from "react-icons/tb";
import { FaRegFaceKissWinkHeart } from "react-icons/fa6";
import { FaKissWinkHeart } from "react-icons/fa";
import coach1 from "../images/about-1.jpg"
import coach2 from "../images/about-2.jpg"
import value1 from "../images/value-2.jpg"
import value2 from "../images/nutri-1.jpg"
import { FaPhone } from "react-icons/fa6";
import { GiRotaryPhone } from "react-icons/gi";
import { TbCertificate } from "react-icons/tb";
import { FaLeaf } from "react-icons/fa";
import nutri4 from "../images/nutri-4.jpg"
import Testimonial from "../components/Testimonials";
import { CiCalendar } from "react-icons/ci";
import taco from "../images/Taco-Salad.jpg"
import buffalo from "../images/Buffalo.jpg"
import pancake from "../images/Sheet-Pan.jpg"
import granola from "../images/Granola-Bars.jpg"
import Oats from "../images/Overnight-Oats.jpg"
import potato from "../images/Sweet-Potato.jpg"


function countWords(text) {
  return text.split(/\s+/).filter(word => word !== '').length;
}

const Home = () => {
  const [grid, setGrid] = useState(4);
  const productState = useSelector((state) => state.product.product);
  const navigate=useNavigate()
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const isTitleTooLong = productState?.some(item => countWords(item?.title) > 10);
 
const { productId } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    getblogs();
    getallProducts();
    getallCovers();
    getAllWines();
  }, []);
  const getblogs = () => {
    dispatch(getAllBlogs());
  };
  const getallProducts = () => {
    dispatch(getAllProducts());
  };

  const getallCovers =()=>{
    dispatch(getAllCovers());
  }

  const addToWish = (id) => {
    dispatch(addToWishlist(id));
  };


  const [isModalOpen, setIsModalOpen] = useState(false);

  
  const showVideoModal = () => {
    setIsModalOpen(true);
  };

  
  const closeVideoModal = () => {
    setIsModalOpen(false);
  };

 

  return (
    <>
      <Meta title={"Nutriprep"} />

      <Container className="home-wrapper-1">
  <div className="background-slider">
    <div className="slider-overlay"></div>
    <div className="background-image image-1"></div>
    <div className="background-image image-2"></div>
    </div>
  <div className="content-wrapper">
    <span>Personalized Nutrition & Wellness</span>
  <h2>achieve your health goals by providing personalized nutrition and wellness plans</h2>
  <p>Fresh, nutritious, and delicious meals for every lifestyle.</p>

    <button className="cta-button">Our Programs</button>
  </div>
  <Counter/>
</Container>
 
  <Container className="homer-wrapper-1">
    <div className="about-us-wrapper">
     <div className="about-us-image">
      <img src={about1} alt="/"/>
     </div>
     <div className="about-us-content">
       <div className="about-us-header">
        <span>Learn More About Us</span>
        <h2>Our team of experts is dedicated to helping you achieve your health goals</h2>
        <p>For over 20 years, Nutriprep has been renowned for its award-winning coverage of food, nutrition, and sustainability. </p>
       </div>
       <div className="about-us-content-el">
         <div className="about-us-content-el-1">
          <div className="about-us-img-el">
          <img src={about2} alt="about image"/>
           <div className="play-button-wrapper-el">
           <div className="play-button-wrapper">
       <div className="circle-animation">
      <div className="circle one"></div>
      <div className="circle two"></div>
    </div>
          <span className="play-button" onClick={showVideoModal}>
          <FaPlay className="play-icon"/>
          </span>

   
       
        </div>
           </div>
          </div>
 
  
           <div className="about-us-button-wrapper">
            <button className=" about-us-button">Learn More</button>
            <span>
              <a href="+100 00 5434553"><BiPhoneCall className="call-icon"/> +100 00 5434553</a>
            </span>
           </div>

                         {/* Video Modal */}
                         {isModalOpen && (
        <div className="video-modal-overlay" onClick={closeVideoModal}>
          <div
            className="video-modal-content"
            onClick={(e) => e.stopPropagation()} // Prevent click propagation to the overlay
          >

            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/9h9S9kD67-Q?si=mVm6T5bSzzQYcwk1" 
              title="Video Player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            
          </div>
          <button className="modal-close" onClick={closeVideoModal}>
              &times;
            </button>

        </div>
      )}
         </div>
         <div className="about-us-content-el-2">
           <p>Our goal is to bring vibrant, flavorful recipes from around the globe to your kitchen, highlighting fresh ingredients and the farmers, artisans, and chefs who make them possible.</p>
            <p>"Healthy eating isn’t a chore—it’s a lifestyle that can fit seamlessly into your routine."</p>
           <ul>
           <li>
              <TiTick className="tick-icon" /> Expertly Tested Recipes
            </li>
            <li>
              <TiTick className="tick-icon" /> Simple Meal Prep Solutions
            </li>
            <li>
              <TiTick className="tick-icon" /> Engaging Community Support
            </li>
           </ul>
         </div>
       </div>
     </div>
    </div>
  </Container>

   

  <Container className="homer-wrapper-1">
    <div className="featured-el-wrapper">
      <div className="featured-el-header">
        <span>Our Featured Recepies</span>
        <h2>Delicious and Easy Meal Ideas to Elevate Your Healthy Eating</h2>
      </div>

      <div className="featured-el-cards-wrapper">
        <div className="featured-el-card">
          <img src={taco} alt="featured"/>
          <div className="featured-el-content">
           <h3>Taco Salad</h3>
          <p>Taco salad is everything you love about crispy beef tacos but in salad form!</p>
        
          </div>
   </div>

   <div className="featured-el-card">
          <img src={pancake} alt="featured"/>
          <div className="featured-el-content">
           <h3>Sheet Pan Pancakes</h3>
          <p>These sheet pan pancakes make breakfast on weekends a breeze!</p>
        
          </div>
   </div>
      <div className="featured-el-card">
          <img src={buffalo} alt="featured"/>
          <div className="featured-el-content">
           <h3>Buffalo Beans and Green</h3>
          <p>These Buffalo beef and greens are a little bowl luxury on a shoestring budget.</p>
        
          </div>
   </div>
   <div className="featured-el-card">
          <img src={granola} alt="featured"/>
          <div className="featured-el-content">
           <h3>Granola Bars</h3>
          <p>Homemade Granola Bars are delicious and free of all the junk and preservatives </p>
        
          </div>
   </div>
   <div className="featured-el-card">
          <img src={Oats} alt="featured"/>
          <div className="featured-el-content">
           <h3>Overnight Oats</h3>
          <p>Overnight Oats are the ultimate introduction to budget-friendly meal prep!</p>
        
          </div>
   </div>
   <div className="featured-el-card">
          <img src={potato} alt="featured"/>
          <div className="featured-el-content">
           <h3>Sweet Potato Black Bean Skillet</h3>
          <p>Quick and easy one-skillet meals are always my favorite and this Sweet Potato Black Bean skillet.</p>
        
          </div>
   </div>

  
      </div>

      <div className="featured-btn-container"><button>View More</button></div>
    </div>
  </Container>

  {/*
   <Container className="homer-wrapper-1">
    <div className="services-wrapper">
      <div className="services-header">
        <span>Nutrition & Wellness Services</span>
        <h2>variety of services and resources to support your journey</h2>
      </div>

      <div className="services-cards-wrapper">
        <div className="service-card">
          <div className="service-content">
          <MdNoMeals className="services-icon"/>
          <h3>Personalized Nutrition Plans</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit Ut elit tellus</p>
        
          </div>
   </div>
        <div className="service-card">
          <div className="service-content">
          <FaKissWinkHeart className="services-icon"/>
          <h3>Holistic Health</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit Ut elit tellus</p>
      
          </div>
      </div>
        <div className="service-card">
          <div className="service-content">
          <TbPlant2 className="services-icon"/>
          <h3>Wellness Coaching</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit Ut elit tellus</p>
          </div>
      </div>
        <div className="service-card">
          <div className="service-content">
          <GiDiamondTrophy className="services-icon"/>
          <h3>Supplement Consultant</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit Ut elit tellus</p>
          </div>
      </div>
        <div className="service-card">
          <div className="service-content">
          <FaVideo className="services-icon"/>
          <h3>Educational Resources</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit Ut elit tellus</p>
          </div>
       </div>
        <div className="service-card">
          <div className="service-content">
          <HiSpeakerphone className="services-icon"/>
          <h3>Community Support</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit Ut elit tellus</p>
          </div>
      </div>
      </div>
    </div>
  </Container>
  */}

 

  <Container className="homer-wrapper-1">
    <div className="coach-wrapper">
      <div className="coach-content">
        <span>Expert Coach Team</span>
        <h2>certified wellness coaches will work with you one-on-one</h2>
        <p>Our certified wellness coaches are here to empower your health journey. Your wellness goals are their mission, and they bring expertise, passion, and a holistic approach to ensure your success.</p>
        <button>Let's Talk</button>
      </div>
      <div className="coach-image-wrapper">
        <div className="coach-image-container">
        <img src={coach1} alt="coach-image"/>
        </div>
      <div className="coach-image-container">
      <img src={coach2} alt="coach-image"/>
      </div>
       
      </div>
    </div>
  </Container>

   {/*   <Container>
    <div className="value-wrapper">
      <div className="value-image-wrapper">
        <div className="value-image-container">
          <img src={value1} alt="value image"/>
        </div>
        <div className="value-image-container-2">
        <img src={value2} alt="value image"/>
        </div>
        <button className="value-btn">
        <FaPhone className="call-icon"/>
          <div className="reach-us-el">
          <b>Reach Us</b>
          <a href="+238 354 556 655">+238 354 556 655</a>
          </div>

        </button>
      </div>
      <div className="value-content">
        <div className="value-header">
          <span>Our Value</span>
          <h2>
          Our nutrition experts will create a customized meal plan that is tailored to your individual needs
          </h2>
        </div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
         <ul>
          <li>
          <GiRotaryPhone className="value-icon"/>
            <div>
            <b>Free Consultation 24 Hours</b>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
         </li>
          <li>
          <TbCertificate className="value-icon"/>
            <div>
            <b>Nutrition Legal Certificate</b>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
      </li>
          <li>
          <FaLeaf className="value-icon"/>
            <div>
            <b>Organic Nutrition Expertise</b>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
        </li>
         </ul>
      </div>
    </div>
  </Container>*/}



<Container className="home-wrapper-1">
    <div className="elementor-wrapper">
        <div className="elementor-header">
            <span>Why Choose Nutri Prep</span>
            <h2>Transforming healthy eating into a seamless, enjoyable, and stress-free experience</h2>
        </div>
        <div className="elementor-wrapper-el">
            <img src={nutri4} alt="Nutri Prep Meal"/>
            <div className="elementor-cards">
                <div className="elementor-card">
                    <div className="elementor-content">
                        <h3>Customizable Meal Solutions</h3>
                        <p>Enjoy meals tailored to your nutritional needs, making healthy eating simple and convenient.</p>
                    </div>
                </div>
                <div className="elementor-card">
                    <div className="elementor-content">
                        <h3>Expertly Crafted Recipes</h3>
                        <p>Our meals are thoughtfully designed with a focus on high-protein ingredients and essential nutrients.</p>
                    </div>
                </div>
                <div className="elementor-card">
                    <div className="elementor-content">
                        <h3>Commitment to Sustainability</h3>
                        <p>We prioritize eco-friendly practices, ensuring meals that are good for you and the planet.</p>
                    </div>
                </div>
                <div className="elementor-card">
                    <div className="elementor-content">
                        <h3>Trusted by Hundreds</h3>
                        <p>With years of experience and satisfied customers, Nutri Prep is a name you can count on.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</Container>


 <Testimonial/>

 <Container className="home-wrapper-1">
  <div className="blog-wrapper">
    <div className="blog-header">
      <div className="blog-header-el-1">
        <span>Our Blog</span>
        <h2>Nutrition & Wellness Tips</h2>
      </div>
      <div>
        <button>View All</button>
      </div>
    </div>
    <div className="blog-card-container">
      <div className="blog-card-container-1">
        <div className="blog-card">
          <img src={value1} alt="blog"/>
          <div className="blog-content">
            <span><CiCalendar className="calender-icon"/> April 23 2024</span>
            <h2>Mindfull & Wellnes Package For Woman</h2>
           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
          <button>Learn More</button>
          </div>
        </div>
        <div className="blog-card">
          <img src={about1} alt="blog"/>
          <div className="blog-content">
            <span><CiCalendar className="calender-icon"/> August 13 2024</span>
            <h2>Mindfull & Wellnes Package For Woman</h2>
           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
          <button>Learn More</button>
          </div>
        </div>
      </div>
      <div className="blog-card-container-2">
      <div className="blog-card-2">
          <img src={about1} alt="blog"/>
          <div className="blog-content-2">
            <span><CiCalendar className="calender-icon"/> August 13 2024</span>
            <h2>Mindfull & Wellnes Package For Woman</h2>
           </div>
        </div>
        <div className="blog-card-2">
          <img src={about1} alt="blog"/>
          <div className="blog-content-2">
            <span><CiCalendar className="calender-icon"/> August 13 2024</span>
            <h2>Mindfull & Wellnes Package For Woman</h2>
           </div>
        </div>
        <div className="blog-card-2">
          <img src={about1} alt="blog"/>
          <div className="blog-content-2">
            <span><CiCalendar className="calender-icon"/> August 13 2024</span>
            <h2>Mindfull & Wellnes Package For Woman</h2>
           </div>
        </div>
      </div>
    </div>
  </div>
 </Container>


    </>
  );
};

export default Home;
