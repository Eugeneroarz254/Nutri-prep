import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { getRecentlyViewedProducts } from '../features/user/userSlice';

function countWords(text) {
  return text.split(/\s+/).filter((word) => word !== '').length;
}

const RecentlyViewedProducts2 = () => {
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const recentlyViewed = useSelector((state) => state.auth.recentlyViewed);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getCustomerfromLocalStorage = localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    : null;

  const userId = getCustomerfromLocalStorage ? getCustomerfromLocalStorage._id : null;

  useEffect(() => {
    if (userId) {
      dispatch(getRecentlyViewedProducts(userId));
    }
  }, [dispatch, userId]);

  return (
    <section className="related-products-wrapper flex-column justify-content-center d-flex w-100">
      <div className={`related-products-collection${isDesktop ? ' row w-100' : ''}`}>
      {recentlyViewed && recentlyViewed.map((product, index) => {
          // Calculate the percentage difference for each product


          return (
            <div
              className="product-card position-relative"
              key={index}
            >
              <div className="product-image">
                <img
                  src={product?.images[0].url}
                  className="img-fluid mx-auto"
                  alt="product image"
                  width={160}
                  onClick={() => { window.location.href = '/product/' + product?._id; }}   
                  />
              </div>
              <div className="percentage-difference">
              ABV {product?.abv}%
              </div>
              <div className="product-details">
                <h6 className="brand">{product?.brand}</h6>
                <h5 className="product-title">{product?.title}</h5>
                <div className="prices-wrapper">
                    {product?.pricePerSize?.length > 1 ? (
                        // Display range of prices if multiple sizes exist
                        <p className="price">
                        KES {Math.min(...product?.pricePerSize.map(size => parseInt(size.price))).toLocaleString()} - 
                        KES {Math.max(...product?.pricePerSize.map(size => parseInt(size.price))).toLocaleString()}
                        </p>
                    ) : product?.pricePerSize?.length === 1 ? (
                        // Display single price if only one size exists
                        <p className="price">
                        KES {parseInt(product.pricePerSize[0].price).toLocaleString()}
                        </p>
                    ) : (
                        // Fallback in case no size exists
                        <p className="price">Price not available</p>
                    )}
                    </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default RecentlyViewedProducts2;
