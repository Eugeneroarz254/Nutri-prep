import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../features/products/productSlice";
import ReactPaginate from 'react-paginate';




const ProductCard = (props) => {

  
  const productState = useSelector(state => state?.product?.singleproduct)
  const { grid, data } = props;
  let location = useLocation();
  const dispatch = useDispatch();

  const addToWish = (id) => {
    dispatch(addToWishlist(id));
  };

  const currentItems = Array.isArray(data) ? data : [data];
  
  const [totalReviews, setTotalReviews] = useState(0);
  const authState = useSelector(state => state?.auth)
 const [averageRating, setAverageRating] =useState(0);
 const [hasHalfStar, setHasHalfStar]=useState(0);
 const [emptyStarsCount, setEmptyStarsCount]= useState(0);
 const [fullStarsCount, setFullStarsCount] = useState(0);
 const [reviewerFirstName, setReviewerFirstName] = useState('');

 useEffect(() => {
  if (
    productState &&
    productState.ratings &&
    productState.ratings.length > 0 &&
    productState.ratings[0].firstname
  )
   {
    setReviewerFirstName(authState?.user?.firstname.trim());
  }

}, [productState]);

  
  useEffect(() => {
    if (productState?.reviews && Array.isArray(productState.reviews)) {
   
      const firstReview = productState.reviews[0];
      const reviewerFirstName = firstReview.firstname;
      setReviewerFirstName(reviewerFirstName);
    }
  
    if (
      productState &&
      productState.ratings &&
      Array.isArray(productState.ratings) &&
      productState.ratings.length > 0
    ) {
      const sum = productState.ratings.reduce((total, rating) => total + rating.star, 0);
      const averageRating = sum / productState.ratings.length;
  
      const fullStarsCount = Math.round(averageRating);
      const emptyStarsCount = 5 - fullStarsCount;
  
      setTotalReviews(productState.ratings.length);
      setAverageRating(averageRating);
      setFullStarsCount(fullStarsCount);
      setEmptyStarsCount(emptyStarsCount);
    } else {
      setTotalReviews(0);
      setAverageRating(0);
      setFullStarsCount(0);
      setEmptyStarsCount(5);
    }
  }, [productState]); 

  return (
    <>

      <div className={`d-grid laptop-store flex-wrap ${grid === 12 ? "grid-cat" : ""}`}>
        {currentItems.map((item, index) => {
          // Calculate averageRating and totalReviews for the current product
          const productRatings = item?.ratings || [];
          const productTotalReviews = productRatings.length;
          const productAverageRating =
            productTotalReviews > 0
              ? productRatings.reduce((total, rating) => total + rating.star, 0) /
                productTotalReviews
              : 0;

         

          return (
            <div
              key={index}
              className={`${
                location.pathname === "/product"
                  ? `gr-${grid}`
                  : "col-3 laptop-col"
              }`}
            >
              <Link to={getProductLink(item)} className="product-card position-relative" style={{ width: grid === 12 ? '100%' : '244px' }}>
                <div className="product-image">
                  <img
                    src={item?.images[0].url}
                    className="img-fluid mx-auto"
                    alt="product image"
                    width={160}
                    loading="lazy"
                  />
                </div>
                <div className="percentage-difference">
                ABV {item?.abv}%
              </div>
                <div className="product-details">
                  <h6 className="brand">{item?.brand}</h6>
                  <h5 className="product-title">{item?.title}</h5>
                  <div className={`${grid === 12 ? "d-flex" : "d-none"} align-items-center gap-10`}>
                    {productAverageRating !== 0 && (
                      <ReactStars
                        count={5}
                        size={24}
                        value={productAverageRating}
                        isHalf={true}
                        edit={false}
                        activeColor="#ffd700"
                      />
                    )}
                             {productAverageRating !== 0 && (

                    <p className="mb-0 t-review">({productTotalReviews})</p>
                    )}

                    </div>
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
                <div className="action-bar position-absolute"></div>
              </Link>
            </div>
          );
        })}
      </div>
  
    </>
  );
};

export default ProductCard;


// Function to generate the product link based on the product type
function getProductLink(product) {
  if (product.type === 'jersey') {
    return '/product2/' + product._id;
  } else if (product.type === 'wines') {
    return '/winesproduct/'+product._id;
  } else {
    return '/product/' + product._id;
  }
}