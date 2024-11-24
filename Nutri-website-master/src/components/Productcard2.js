import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { addToViewedProductsAsync } from "../features/products/productSlice";

function countWords(text) {
  return text.split(/\s+/).filter((word) => word !== "").length;
}

const Productcard2 = (props) => {
  const { grid, data } = props;
  let location = useLocation();
  const authState = useSelector((state) => state?.auth);

  const dispatch = useDispatch();

  const getCustomerfromLocalStorage = localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    : null;

  const user = authState?.user?.user ? authState?.user?.user : authState?.user;
  const userName = user?.firstname || "";
  const userId = user?._id || "";

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
    const recentlyViewed = localStorage.getItem("recentlyViewed") || "[]";
    const viewedProducts = JSON.parse(recentlyViewed);
  }, []);

  return (
    <>
      {data?.map((item, index) => {
        const percentageDifference = Math.round(
          ((item.previousPrice - item.price) / item.previousPrice) * 100
        );

        const productLink = getProductLink(item);

        return (
          <div
            key={index}
            className={`${
              location.pathname === "/product" ? `gr-${grid}` : "col-3 jersey-col"
            }`}
          >
            <div
              onClick={() => handleProductView(item?._id, productLink)}
              className="product-card position-relative"
              style={{ width: grid === 12 ? "100%" : "" }}
            >
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
                <h3 className="brand">{item?.brand}</h3>
                <h4 className="product-title">{item?.title}</h4>
                <p
                  className={`description ${
                    grid === 12 ? "d-block" : "d-none"
                  }`}
                  dangerouslySetInnerHTML={{ __html: item?.description }}
                ></p>
              <div className="prices-wrapper">
                    {item?.pricePerSize?.length > 1 ? (
                        <p className="price">
                        KES {Math.min(...item?.pricePerSize.map(size => parseInt(size.price))).toLocaleString()} - 
                        KES {Math.max(...item?.pricePerSize.map(size => parseInt(size.price))).toLocaleString()}
                        </p>
                    ) : item?.pricePerSize?.length === 1 ? (
                        <p className="price">
                        KES {parseInt(item.pricePerSize[0].price).toLocaleString()}
                        </p>
                    ) : (
                        <p className="price">Price not available</p>
                    )}
                    </div>
              </div>
              <div className="action-bar position-absolute"></div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Productcard2;

function getProductLink(product) {
  return "/product/" + product._id;
}
