import React, { useCallback, useEffect, useRef } from 'react'
import 'swiper/css/free-mode';
import { useState } from 'react';
import {AiOutlineLeft} from "react-icons/ai"
import {AiOutlineRight} from "react-icons/ai"
import {GoDot} from "react-icons/go"
import { Link } from "react-router-dom";



const slideStyles = {
   
    width:'100%',
    height:'100%',
    backgroundPosition:'center',
    backgroundSize:'cover'
}

const sliderStyles = {
    position:"relative",
    height:"100%",
}

const leftArrowStyles = {
position:"absolute",
top:"50%",
transform:"translate(0, -50%)",
left:"32px",
fontSize:"45px",
color:"#fff",
zIndex:1,
cursor:"pointer",
};

const rightArrowStyles = {
    position:"absolute",
    top:"50%",
    transform:"translate(0, -50%)",
    right:"32px",
    fontSize:"45px",
    color:"#fff",
    zIndex:1,
    cursor:"pointer",
    };

const dotsContainerStyles ={
    display: "flex",
    justifyContent:"center",
    position: "absolute",
    bottom:"0px",
    alignItems:"center",
    width:"100%"
};

const dotStyles = {
    margin: "0 5px", // Adjust the margin between dots
    cursor: "pointer",
    fontSize: "20px",
    color: "black",
  };

  const activeDotStyles = {
    fontSize: "24px", // Adjust the size of the active dot
    color: "blue", // Color for the active dot
  };


const slidesContainerStyles = {
    display:'flex',
    height:'100%',
    transition:'transform ease-out 0.3s'
}

const slidesContainerOverfowStyles = {
    overflow: 'hidden',
    height:'100%'
}


const ImageSlider = ({slides, parentWidth}) => 
{
const timerRef = useRef(null)
const [currentIndex, setCurrentIndex] =useState(0)



const goToPrevious =() =>{
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length -1 : currentIndex -1;
setCurrentIndex(newIndex)
}

const goToNext =useCallback(() =>{
    const isLastSlide = currentIndex === slides.length -1;
    const newIndex = isLastSlide ? 0 : currentIndex +1;
    setCurrentIndex(newIndex) 
},[currentIndex, slides]);

const goToSlide = (slideIndex) =>{
    setCurrentIndex(slideIndex);
    setDots(slideIndex)
};

const getSlideStylesWithBackground = (slideIndex) =>({
    ...slideStyles,
    backgroundImage: `url(${slides[slideIndex].url})`,
   width:`${parentWidth}px`,
})

const getSlidesContainerStylesWithWidth = () =>({
...slidesContainerStyles,
width: parentWidth * slides.length,
transform:`translateX(${-(currentIndex * parentWidth)}px)`
})

useEffect(()=>{
if(timerRef.current){
    clearTimeout(timerRef.current);
}

    timerRef.current = setTimeout(() =>{
        goToNext();
    },4000);

    return () => clearTimeout(timerRef.current)
},[goToNext])

const [dots, setDots] = useState(0); // State to keep track of active dot


  return (
 <>
<div style={sliderStyles}>
    <div>
    <div style={leftArrowStyles}
     onClick={goToPrevious}> 
     <AiOutlineLeft className='left-arrow'/></div>
    <div style={rightArrowStyles}
     onClick={goToNext}><AiOutlineRight className='right-arrow'/>
     </div>
     </div>
<div style={slidesContainerOverfowStyles}>
<div style={getSlidesContainerStylesWithWidth()}>
    {slides.map((_, slideIndex) =>(
      <Link to={_.component}
      key={slideIndex} 
      style={getSlideStylesWithBackground(slideIndex)}>
      </Link>
   ) )}
</div>
</div>
   <div style={dotsContainerStyles}>
    {slides.map((slide, slideIndex) =>(
    <div
     key={slideIndex}
     style={dots === slideIndex ? { ...dotStyles, ...activeDotStyles } : dotStyles}
     onClick={() =>goToSlide(slideIndex)}
     ><GoDot className='dot'/>
     </div>
    ))}
   </div>
   </div>
  
 </>
  )
}

export default ImageSlider