import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Container from './Container';
import { addToViewedProductsAsync, getRelatedProducts } from '../features/products/productSlice';
import Carousel from 'react-multi-carousel';

const CartRelatedProducts = ({ productIds }) => {
  const responsive = {
    superLargeDesktop: {
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
  const authState = useSelector(state => state?.auth)

  const isDesktop = useMediaQuery({ minWidth: 768 });
  const relatedProducts = useSelector((state) => state.product.relatedProducts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (productIds) {
      dispatch(getRelatedProducts(productIds));
    }
  }, [dispatch, productIds]);


  const user = authState?.user?.user ? authState?.user?.user : authState?.user;
  const userId = user?._id || "";

  const handleProductView = async (productId) => {
    try {
      await dispatch(addToViewedProductsAsync({ id: userId, productId }));
  
      // Navigate to the product details page
  
      // Update the local storage with the recently viewed products
      const recentlyViewed = localStorage.getItem('recentlyViewed') || '[]';
      const viewedProducts = JSON.parse(recentlyViewed);
  
      // Make sure the product ID is not already in the array
      if (!viewedProducts.includes(productId)) {
        viewedProducts.unshift(productId);
      }
  
      // Limit the number of viewed products if needed
      if (viewedProducts.length > 10) {
        viewedProducts.pop(); // Remove the last viewed product if the array exceeds a certain size
      }
  
      localStorage.setItem('recentlyViewed', JSON.stringify(viewedProducts));
    } catch (error) {
      // Handle any errors that may occur during the process
      console.error('Error viewing product:', error);
    }
  };

  return (
    <section className="related-products-wrapper flex-column justify-content-center d-flex  w-100">
      {relatedProducts.length > 0 && (
        <>
                <div className='w-100 d-flex justify-content-start'>
          <h2 className="related-products-heading">You may also like</h2>
        </div>
        <div className='other-products-hr'></div> 

        </>

      )}
      <div className={`related-products-collection${isDesktop ? ' row w-100' : ''}`}>
        <Carousel responsive={responsive}>
          {relatedProducts && relatedProducts.map((product) => {
            // Calculate the percentage difference for each product
       

            return (
              <div
                className="product-card position-relative"
                key={product._id}
                onClick={() => { window.location.href = '/product/' + product?._id; }}   
                >
                <div 
               onClick={() => handleProductView(product?._id)}

                className="product-image">
                  <img
                    src={product.images[0].url}
                    className="img-fluid mx-auto"
                    alt="product image"
                    width={160}
                  />
  
                </div>
                <div className="percentage-difference">
                ABV {product?.abv}%
                    </div>
                <div className="product-details">
                  <h6 className="brand">{product.brand}</h6>
                  <h5 className='product-title'>{product.title}</h5>
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

export default CartRelatedProducts;
