import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToViewedProductsAsync } from "../features/products/productSlice";

const SearchCard = (props) => {
  const { grid, data } = props;
  const currentItems = Array.isArray(data) ? data : [data];

  let location = useLocation();
  const authState = useSelector(state => state?.auth)

  const dispatch = useDispatch();

  const getCustomerfromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

  const user = authState?.user?.user ? authState?.user?.user : authState?.user;
  const userName = user?.firstname || "";
  const userId = user?._id || "";


  const handleProductView = async (productId) => {
    try {
      await dispatch(addToViewedProductsAsync({ id: userId, productId }));
  
  
      const recentlyViewed = localStorage.getItem('recentlyViewed') || '[]';
      const viewedProducts = JSON.parse(recentlyViewed);
  
      if (!viewedProducts.includes(productId)) {
        viewedProducts.unshift(productId);
      }
  
      if (viewedProducts.length > 10) {
        viewedProducts.pop(); // Remove the last viewed product if the array exceeds a certain size
      }
  
      localStorage.setItem('recentlyViewed', JSON.stringify(viewedProducts));
    } catch (error) {
      console.error('Error viewing product:', error);
    }
  };
  
  useEffect(() => {
    const recentlyViewed = localStorage.getItem('recentlyViewed') || '[]';
    const viewedProducts = JSON.parse(recentlyViewed);
  
  }, []);

  return (
    <>
      <div className={`d-grid search-store flex-wrap ${grid === 12 ? "grid-cat" : ""}`}>
        {currentItems.map((item, index) => {
      

          return (
            <div key={index} className="search-card">
              <Link 
              onClick={() => handleProductView(item?._id)}
              to={getProductLink(item)} 
              className="product-card position-relative">
                <div className="product-image">
                <img
                  loading="lazy"
                  src={item?.images[0]?.url}
                  className="img-fluid mx-auto"
                  alt={`Image of ${item?.title}`}
                  width={160}
                  height={160} // Add height attribute here
                  title={item?.title}
                  
                />
                </div>
                <div className="percentage-difference">
                ABV {item?.abv}%
                </div>
                <div className="product-details">
                  <h6 className="brand">{item?.category}</h6>
                  <h5 className="product-title">{item?.title}</h5>
                  <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}
                     dangerouslySetInnerHTML={{ __html: item?.description }}>
                  </p>
                  <div className="prices-wrapper">
                    {item?.pricePerSize?.length > 1 ? (
                        // Display range of prices if multiple sizes exist
                        <p className="price">
                        KES {Math.min(...item?.pricePerSize.map(size => parseInt(size.price))).toLocaleString()} - 
                        KES {Math.max(...item?.pricePerSize.map(size => parseInt(size.price))).toLocaleString()}
                        </p>
                    ) : item?.pricePerSize?.length === 1 ? (
                        // Display single price if only one size exists
                        <p className="price">
                        KES {parseInt(item.pricePerSize[0].price).toLocaleString()}
                        </p>
                    ) : (
                        // Fallback in case no size exists
                        <p className="price">Price not available</p>
                    )}
                    </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SearchCard;


function getProductLink(product) {
  if (product.type === "jersey") {
    return "/product2/" + product._id;
  } else if (product.type === "wines") {
    return "/winesproduct/" + product._id;
  } else {
    return "/product/" + product._id;
  }
}