import React from "react";
import Slider from "react-slick";

import ava01 from "../images/ava-1.jpg";
import ava02 from "../images/ava-2.jpg";
import ava03 from "../images/ava-3.jpg";
import ava04 from "../images/ava-4.jpg";
import Container from "./Container";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonial = () => {
  const settings = {
    infinite: true,
    autoplay: true,
    speed: 1000,
    lazyLoad: "ondemand",
    slidesToShow: 3, // Number of slides visible
    slidesToScroll: 1,
    centerMode: true, // Enables space between slides
    centerPadding: "15px", // Adds a gap of 15px on both sides of the slide
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerPadding: "10px", // Reduce gap on smaller screens
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "5px", // Further reduce gap for mobile screens
        },
      },
    ],
  };
  
  

  return (
<Container class1="home-wrapper-1">
    <div className="testimonial-wrapper py-5">
        <div className="testimonial-overlay"></div>
        <div className="testimonial-el">
            <div className="popular-header">
                <span className="section-tag">Our Testimonials</span>
                <h2>Transforming Lives with Delicious, Nutritious, and Convenient Meals</h2>
            </div>

            <Slider {...settings}>
                <div className="testimonial py-4 px-3">
                    <p className="section__description">
                        "Nutri Prep has completely changed how I approach eating healthy! The meals are delicious, and the portion sizes are perfect. Meal prepping used to feel overwhelming, but now it's easy, thanks to the tips and tutorials Nutri Prep provides!"
                    </p>
                    <div className="mt-3 d-flex align-items-center gap-4">
                        <img src={ava01} alt="Ethan Blake" className="w-25 h-25 rounded-2" />
                        <div>
                            <h6 className="mb-0 mt-3">Ethan Blake</h6>
                            <p className="section__description">Customer</p>
                        </div>
                    </div>
                </div>

                <div className="testimonial py-4 px-3">
                    <p className="section__description">
                        "As someone who struggled with portion control, Nutri Prep's recipes and nutritional advice have been a lifesaver. The containers they recommend make it so easy to plan my meals, and I've already lost 10 pounds in just a month!"
                    </p>
                    <div className="mt-3 d-flex align-items-center gap-4">
                        <img src={ava02} alt="Sophia Harper" className="w-25 h-25 rounded-2" />
                        <div>
                            <h6 className="mb-0 mt-3">Sophia Harper</h6>
                            <p className="section__description">Customer</p>
                        </div>
                    </div>
                </div>

                <div className="testimonial py-4 px-3">
                    <p className="section__description">
                        "I’ve never felt so organized with my meals! The weekly tutorials from Nutri Prep have made meal prepping a breeze. Now, I save so much time during the week, and my family loves the variety of meals I prepare."
                    </p>
                    <div className="mt-3 d-flex align-items-center gap-4">
                        <img src={ava03} alt="Oliver Bennett" className="w-25 h-25 rounded-2" />
                        <div>
                            <h6 className="mb-0 mt-3">Oliver Bennett</h6>
                            <p className="section__description">Customer</p>
                        </div>
                    </div>
                </div>

                <div className="testimonial py-4 px-3">
                    <p className="section__description">
                        "The high-protein meal options are perfect for my fitness goals. Nutri Prep’s recipes and advice have helped me stay consistent, and I’m seeing amazing results in both muscle gain and energy levels. Highly recommended!"
                    </p>
                    <div className="mt-3 d-flex align-items-center gap-4">
                        <img src={ava04} alt="Lily Morgan" className="w-25 h-25 rounded-2" />
                        <div>
                            <h6 className="mb-0 mt-3">Lily Morgan</h6>
                            <p className="section__description">Customer</p>
                        </div>
                    </div>
                </div>
            </Slider>
        </div>
    </div>
</Container>

  );
};

export default Testimonial;
