import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { getRecentlyViewedProducts } from '../features/user/userSlice';

function countWords(text) {
  return text.split(/\s+/).filter((word) => word !== '').length;
}

const RecentlyViewedProducts = () => {
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const authState = useSelector(state => state?.auth)
  const recentlyViewed = useSelector((state) => state.auth.recentlyViewed);
  const navigate = useNavigate();
  const dispatch = useDispatch();


    const user = authState?.user?.user ? authState?.user?.user : authState?.user;
    const userId = user?._id || "";
  
  useEffect(() => {
    if (userId) {
      dispatch(getRecentlyViewedProducts(userId));
    }
  }, [dispatch, userId]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5, // Number of visible items
      slidesToSlide: 5, // Number of items to slide on next/prev
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3, // Adjust number of visible items for tablet
      slidesToSlide: 3, // Slide 3 items on next/prev
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1, // One item visible on mobile
      slidesToSlide: 1, // Slide 1 item on next/prev for mobile
    },
  };

  return (
    <section className="related-products-wrapper flex-column justify-content-center d-flex  w-100">
      {recentlyViewed.length > 0 && (
        <>
               <div className="w-100 d-flex justify-content-start">
         <h2 className="related-products-heading">Recently viewed products</h2>
        <hr className='other-products-hr'/>
        </div>
       <div className='other-products-hr'></div> 
        </>


      )}
      <div className={`special-wrapper w-100 ${isDesktop ? 'row' : ''}`}>
        <Carousel
          swipeable={true}
          responsive={responsive}
          containerClass="carousel-container"
          removeArrowOnDeviceType={['tablet', 'mobile']}
          deviceType={isDesktop ? 'desktop' : 'mobile'}
        >
          {recentlyViewed && recentlyViewed.map((product, index) => {
      

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
        </Carousel>
      </div>
    </section>
  );
};

export default RecentlyViewedProducts;
