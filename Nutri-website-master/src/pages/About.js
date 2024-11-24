import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import aboutImg from "../images/about-us.jpg";
import Counter from "../components/Counter";
import { LiaShippingFastSolid } from "react-icons/lia";
import { FaWarehouse } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import { LuClipboardList } from "react-icons/lu";

const About = () => {
  return (
    <>
       <Meta 
        title="About Us"
        description="Learn more about The Best Sellers Shop, your go-to source for high-quality office furniture. We offer delivery, stock availability, quick ordering, and showroom visits." 
        keywords="office furniture, ergonomic chairs, desks, storage solutions"
      />
      <BreadCrumb title="About Us" />
      <Container class1="policy-wrapper  home-wrapper-2">
        <div className="row m-0">
          <div className="col-12 bg-white about-container-wrapper">
            <h1 className="p-3">About Us</h1>
          <div className="about">
           
           <div className="about-content">
           <p>
           The Best Sllers Shop is your go-to source for all office furniture needs. Over the years, we have built a reputation for delivering exceptional furniture solutions designed to meet the evolving demands of modern workplaces.

           <br></br><br></br> 
           At  The Best Sllers Shop , we recognize the importance of creating a well-designed and functional workspace that boosts productivity and creativity. We offer a wide selection of furniture options for various settings, including executive offices, call centers, waiting areas, cafeterias, hospitals, home offices, and corporate environments.
           <br></br><br></br> 
            Our extensive product range includes ergonomic chairs, stylish desks, and versatile storage solutions. We are committed to providing top-quality furniture that not only meets but surpasses industry standards, ensuring durability, comfort, and style.
            <br></br><br></br> 
            Understanding that budget is a crucial factor for businesses of all sizes, we focus on delivering affordable solutions that fit your needs. Our knowledgeable team is always ready to assist, offering expert advice and recommending alternative products and solutions tailored to your budget.
                      
           </p>
           </div>
           <div className="about-img-container">
            <img src={aboutImg} alt=""/>
           </div>
           
  
 
       
          </div>


          <div className="about-section-2">
            <div className="about-card">
              <div className="about-icon-container">
                <LiaShippingFastSolid className="about-icon"/>
                </div>
              <div>
                <h1>Delivery & Assembly</h1>
              </div>
              <div>
                <p>
                Our expert team of installers will deliver and assemble your furniture on the listed towns on checkout page for a nominal fee. Delivery outside the listed delivery locations can be arranged by contacting our sales office on +254 113886482.
                </p>
              </div>
            </div>
            <div className="about-card">
              <div className="about-icon-container">
               
                <LuClipboardList className="about-icon"/>
                </div>
              <div>
                <h1>Quick Order</h1>
              </div>
              <div>
                <p>
                We have a quick Order service, you can place your order in just a few clicks and have your items delivered right to your doorstep. Our dedicated team ensures prompt and reliable delivery, so you can enjoy your new furniture without any delays.                 </p>
              </div>
            </div>
            <div className="about-card">
              <div className="about-icon-container">
    
                <MdEventAvailable className="about-icon"/>
                </div>
              <div>
                <h1>Stock Availability</h1>
              </div>
              <div>
                <p>
                Our stock items are available within 3 to 5 days and our made to order items will take 3 to 6 weeks to manufacture. Please discuss the lead times with your sales consultant.                </p>
              </div>
            </div>
            <div className="about-card">
              <div className="about-icon-container">
                <FaWarehouse className="about-icon"/>
                </div>
              <div>
                <h1>Showroom & Viewing</h1>
              </div>
              <div>
                <p>
                In order to keep our prices as low as possible the majority of our products are primarily only available for viewing online. Factory showroom visits can be arranged on special request and need to be scheduled with your sales consultant.                </p>
              </div>
            </div>
          </div>


          <div>
            <Counter/>
          </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default About;
