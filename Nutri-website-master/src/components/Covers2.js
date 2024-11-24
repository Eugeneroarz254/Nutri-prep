import React, { useEffect, useState } from "react";
import { BsFillArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllCovers } from "../features/cover/coverSlice";
import {GoDot} from "react-icons/go"

const Covers2 = () => {
  const coverState = useSelector((state) => state.covers.covers);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dots, setDots] = useState(0); // State to keep track of active dot

  const dispatch = useDispatch();
  useEffect(() => {
    getallCovers();
  }, []);

  const getallCovers = () => {
    dispatch(getAllCovers());
  };

  const categoryToCustomLink = {
    "Sets": "sets",
    "Main Cover": "beauty-collection",
    "Phones Cover":"Phones"
  };

  // Filter covers to include only the specified categories
  const filteredCovers = coverState.filter((cover) =>
    categoryToCustomLink.hasOwnProperty(cover.category)
  );

  const handleNext = () => {
    const nextIndex = currentIndex + 1 >= filteredCovers.length ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
    setDots(nextIndex);
  };

  const handlePrevious = () => {
    const previousIndex = currentIndex - 1 < 0 ? filteredCovers.length - 1 : currentIndex - 1;
    setCurrentIndex(previousIndex);
    setDots(previousIndex);
  };

  const handleDotClick = (dotIndex) => {
    setCurrentIndex(dotIndex);
    setDots(dotIndex);
  };

  // You can also define the styles for individual dots
  const dotStyles = {
    margin: "0 5px", // Adjust the margin between dots
    cursor: "pointer",
    fontSize: "20px",
    color: "white",
  };

  const activeDotStyles = {
    fontSize: "24px", // Adjust the size of the active dot
    color: "blue", // Color for the active dot
  };



  return (
    <>
      <div className="image-container">
        {filteredCovers.map((cover, index) => {
          const customLink = categoryToCustomLink[cover.category];
          const isVisible = index === currentIndex;
          return (
            <div
              className={`image ${isVisible ? "visible2" : "hidden2"}`}
              key={index}
            >
              <Link to={`/${customLink}`} className="w-100 i-cover">
                <img
                  className="w-100 cover-image"
                  src={cover.images[0].url}
                  alt={cover.category}
                />
              </Link>
            </div>
          );
        })}
      </div>
   
  
    </>
  );
};

export default Covers2;
