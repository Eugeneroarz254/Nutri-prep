import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToViewedProductsAsync } from "../features/products/productSlice";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../features/products/productSlice";
import { useMediaQuery } from "react-responsive";
import Container from "./Container";

function countWords(text) {
  return text.split(/\s+/).filter(word => word !== '').length;
}

const TrendingProducts = () => {
  const productState = useSelector((state) => state.product.product);
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const isTitleTooLong = productState?.some(item => countWords(item?.title) > 10);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getallProducts();
  }, []);

  const getallProducts = () => {
    dispatch(getAllProducts());
  };

  const getCustomerfromLocalStorage = localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    : null;

  const userId = getCustomerfromLocalStorage ? getCustomerfromLocalStorage._id : null;

  const handleProductView = async (productId, productLink) => {
    try {
      // Check if user is logged in before dispatching action
      if (userId) {
        await dispatch(addToViewedProductsAsync({ id: userId, productId }));
      }
  
      const recentlyViewed = localStorage.getItem("recentlyViewed") || "[]";
      const viewedProducts = JSON.parse(recentlyViewed);
  
      if (!viewedProducts.includes(productId)) {
        viewedProducts.unshift(productId);
      }
  
      if (viewedProducts.length > 10) {
        viewedProducts.pop(); // Limit the array size to 10
      }
  
      localStorage.setItem("recentlyViewed", JSON.stringify(viewedProducts));
  
      // Navigate using window.location.href
      window.location.href = productLink;
    } catch (error) {
      console.error("Error viewing product:", error);
    }
  };

  useEffect(() => {
    // Retrieve the recently viewed products from local storage
    const recentlyViewed = localStorage.getItem('recentlyViewed') || '[]';
    const viewedProducts = JSON.parse(recentlyViewed);
    // Now you can use viewedProducts in your component if needed
  }, []);

  return (
    <>
      <Container class1="featured-wrapper home-wrapper-2">

        <div className={`ranking-collection flex-column d-flex${isDesktop ? ' featured' : ''}`}>
          {productState &&
            productState
              .filter((item) => item.tags === "featured")
              .slice(0, 3)
              .map((item, index) => {
                const productLink = getProductLink(item);
                return (
                  <div key={index} className={"col-3 px-0"}>
                    
                    <div
                      className="product-card position-relative"
                      onClick={() => handleProductView(item._id, productLink)}
                    >
                      <div className="product-image">
                        <img
                          src={item?.images[0].url}
                          className="img-fluid mx-auto"
                          alt="product image"
                          width={160}
                        />
                      </div>
                      <div className="product-details">
                        <div>
                        <h6 className="brand">{item?.brand}</h6>
                        <h5 className={`product-title ${isTitleTooLong ? 'ellipsis' : ''}`}>
                          {item?.title}
                        </h5>
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

                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      </Container>
    </>
  );
};

export default TrendingProducts;

function getProductLink(product) {
  return "/product/" + product._id;
}
