import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa"; // Import the arrow icon


const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
      // Show the arrow when the user scrolls down a certain distance
      const handleScroll = () => {
        if (window.scrollY > 300) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
  
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
  
    return (
      <div
        className={`back-to-top ${isVisible ? "visible" : ""}`}
        onClick={scrollToTop}
      >
        <FaArrowUp className="up-arrow"/>
      </div>
    );
  };
  

  export default BackToTop;