import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import wishlist from "../images/wishlist.svg";
import watch from "../images/watch.jpg";
import watch2 from "../images/watch-1.avif";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, getAProduct } from "../features/products/productSlice";
import Carousel from 'react-multi-carousel';
import { useEffect } from "react";


const PopularProducts= (props) => {

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 1024 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 1024, min: 800 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 800, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

  const { grid, data } = props;
  let location = useLocation();
  const dispatch = useDispatch();
  const {id} = useParams();
  const productState = useSelector(state => state?.product?.singleproduct)
  const getProductId = location.pathname.split("/")[2]


  const addToWish = (id) => {
    dispatch(addToWishlist(id));
  };


  useEffect(() => {
    dispatch(getAProduct(getProductId));
  }, [getProductId, dispatch]);
  

  useEffect(()=>{
    console.log("Product ID Changed", id)
  }, [id]);

 
  const handleProductClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  return (
    <>
 <Carousel responsive={responsive}>

{data?.map((item, index) => {
  return (


    <div
      key={index}
      className={` ${
        location.pathname == "/product" ? `gr-${grid}` : "col-3"
      } `}
    >
      <div
        className="product-card position-relative"
      >
        <div className="wishlist-icon position-absolute">
          <button className="border-0 bg-transparent">
            <img
              onClick={() => addToWish(item?._id)}
              src={wish}
              alt="wishlist"
            />
          </button>
        </div>
        <div className="product-image">
          <img
            src={item?.images[0].url}
            className="img-fluid  mx-auto"
            alt="product image"
            width={160}
          />
     
        </div>
        <div className="product-details">
          <h6 className="brand">{item?.brand}</h6>
          <h5 className="product-title">{item?.title}</h5>
  
          <p
            className={`description ${
              grid === 12 ? "d-block" : "d-none"
            }`}
            dangerouslySetInnerHTML={{ __html: item?.description }}
          ></p>
          <p className="price">KES {item?.price}</p>
        </div>
        <div className="action-bar position-absolute">
          <div className="d-flex flex-column gap-15">
            {/* <button className="border-0 bg-transparent">
              <img src={prodcompare} alt="compare" />
            </button> */}
            <Link  to={'/product/'+item?._id} 
             className="border-0 bg-transparent"
             onClick={handleProductClick}>
              <img src={view} alt="view" />
            </Link>
           {/*  <button className="border-0 bg-transparent">
              <img src={addcart} alt="addcart" />
            </button> */}
          </div>
        </div>
      </div>
    </div>
   

  );
  
})}


</Carousel>
    
   </>
  )
  };

export default PopularProducts;