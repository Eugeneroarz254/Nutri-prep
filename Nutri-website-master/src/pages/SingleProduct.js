import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import ReactImageZoom from "react-image-zoom";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { TbGitCompare } from "react-icons/tb";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { addRating, addToWishlist, getAProduct, getAllProducts, getRelatedProducts } from "../features/products/productSlice";
import { toast } from "react-toastify";
import { addProdToCart, createAnOrder, getUserCart, getUserProductWishlist, } from "../features/user/userSlice";
import Color from "../components/Color";
import PopularProducts from "../components/PopularProducts";
import SidebarRight from "../components/SidebarRight";
import { useFormik } from 'formik' 
import * as yup from 'yup'
import { Radio, Space } from 'antd';
import { base_url } from "../utils/axiosConfig";
import axios from 'axios';
import CustomInput from "../components/CustomInput";
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BackToTop from "../components/BackToTop";
import { FaPlus, FaMinus } from "react-icons/fa";
import RecentlyViewedProducts from "../components/RecentlyViewedProducts";
import RelatedProducts from "../components/RelatedProducts";
import { MdKeyboardArrowRight,MdKeyboardArrowLeft  } from "react-icons/md";
import BreadCrumb3 from "../components/BreadCrumb3";
import RecentlyViewedProducts2 from "../components/RecentlyViewedProducts2";
import { useMediaQuery } from "react-responsive";
import RelatedProducts2 from "../components/RelatedProducts2";
import { TbTruckDelivery } from "react-icons/tb";
import { FaArrowsRotate } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import loader from "../images/loader-g.gif"
import Size from "../components/Size";

const SingleProduct = () => {
  const [size, setSize] = useState(null);
  const [mainImg, setMainImg] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState('next');
  const [quantity, setQuantity] = useState(1)
  const [alreadyAdded,setAlreadyAdded]=useState(false)
  const [alreadyAddedToWishlist, setAlreadyAddedToWishlist] = useState(false);
  
  
  const location = useLocation();
  const navigate=useNavigate()
  const getProductId = location.pathname.split("/")[2]
  const dispatch = useDispatch();
  const productState = useSelector(state => state?.product?.singleproduct);
 
  const cartState=useSelector(state=>state?.auth?.cartProducts)
  const wishlistState = useSelector((state) => state?.auth?.wishlist);
  const [totalReviews, setTotalReviews] = useState(0);
  const authState = useSelector(state => state?.auth)
  const [averageRating, setAverageRating] =useState(0);
 const [emptyStarsCount, setEmptyStarsCount]= useState(0);
 const [fullStarsCount, setFullStarsCount] = useState(0);
 const [isWishlistActive, setIsWishlistActive] = useState(false);
 const isDesktop = useMediaQuery({ minWidth: 768 });

 const recentlyViewed = useSelector((state) => state.auth.recentlyViewed);
 const relatedProducts = useSelector((state) => state.product.relatedProducts);

 const getTokenFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

  const config2 = {
    headers: {
      Authorization: `Bearer ${
        getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
      }`,
      Accept: "application/json",
    },
  };


  useEffect(() => {
    dispatch(getAProduct(getProductId));
    dispatch(getRelatedProducts(getProductId));
    dispatch(getUserCart());
    dispatch(getAllProducts());
  }, [dispatch, getProductId]);

  useEffect(() => {
    for (let index = 0; index < cartState?.length; index++) {
      if (getProductId === cartState[index]?.productId?._id) {
        setAlreadyAdded(true)
      }
    }
  },[])
 // ...
  
 useEffect(() => {
  const fetchReviewsInterval = setInterval(() => {
    dispatch(getAProduct(getProductId));
  }, 1000); 

  return () => clearInterval(fetchReviewsInterval); // Cleanup on unmount
}, [dispatch, getProductId]);


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


  const props = {
    width:360,
    height:300,
    zoomWidth: 400,
    
    img:mainImg ? mainImg 
    : 
     productState?.images[0]?.url ? productState?.images[0]?.url 
      :
        "https://images.gr-assets.com/hostedimages/1508973430ra/24273491.gif" ,


  };

   
  const [orderedProduct, setorderedProduct] = useState(true);
  const copyToClipboard = (text) => {
    console.log("text", text);
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };
  const closeModal = () => { };




  const [reviewerFirstName, setReviewerFirstName] = useState('');
const [userId, setUserId] = useState("")
  const [star, setStar] = useState(null)
  const [comment,setComment]=useState(null)
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setReviewerFirstName(authState?.user?.firstname || "");
  }, [authState?.user?.firstname]);



  const handleRating = () => {
    if (star === null) {
      toast.error("Please add star rating");
      return false;
    } else if (comment.trim() === "") {
      toast.error("Please write a review about the product.");
      return false;
    } else {
      // Extract user info
      const user = authState?.user?.user ? authState?.user?.user : authState?.user;
      const userName = user?.firstname || "";
      const userId = user?._id || "";
  
      dispatch(
        addRating({
          star: star,
          comment: comment,
          prodId: getProductId,
          userName: userName,
          userId: userId,
        })
      );
  
      // Reset the form after submission
      setStar(null);
      setComment(""); // Set to empty string instead of null
  
      setTimeout(() => {
        dispatch(getAProduct(getProductId));
        toast.success("Product rated successfully");
      }, 100);
    }
  };
  
  
  
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
  
  
  const reviewsPerPage = 2;
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = (productState?.ratings || []).slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil((productState?.ratings || []).length / reviewsPerPage);
  
  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  
  const renderProductReviews = () => {
    if (!productState || productState.isLoading) {
      return <p>Loading...</p>;
    }
  
    if (!productState.ratings || productState.ratings.length === 0) {
      return <p>No reviews available</p>;
    }
  
    // Function to calculate the count of each rating
    const countRatings = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    };
  
    productState.ratings.forEach((item) => {
      const roundedRating = Math.round(item.star);
      countRatings[roundedRating]++;
    });
  
    // Function to calculate the average rating
    const calculateAverageRating = () => {
      const totalReviews = productState.ratings.length;
      const sumOfRatings = productState.ratings.reduce((acc, item) => acc + item.star, 0);
      return totalReviews > 0 ? sumOfRatings / totalReviews : 0;
    };
  
    return (
      <>
        <div className="d-flex ratings-container position-relative w-100">
          <div className="d-flex flex-column align-items-center justify-content-start gap-3">
            <div className="d-flex ratings w-100 flex-column align-items-center">
              <b className="average-rating">
                {calculateAverageRating().toFixed(1)}
                <span>/5</span>
              </b>
              {averageRating !== 0 && (
                <ReactStars
                  count={5}
                  size={24}
                  value={averageRating}
                  isHalf={true}
                  edit={false}
                  activeColor="#ffd700"
                />
              )}
  
              <p>({productState.ratings.length}) Verified Ratings</p>
            </div>
  
            <div className="progress-bars w-100">
              {[5, 4, 3, 2, 1].map((rating) => {
                const percentage = (countRatings[rating] / productState.ratings.length) * 100;
                const remainingPercentage = 100 - percentage;
                return (
                  <div key={rating} className="progress-bar-container">
                    <span className="progress-bar-label">
                      {rating} ({countRatings[rating]})
                    </span>
                    <div
                      className="progress-bar"
                      aria-valuemin={0}
                      aria-valuemax={productState.ratings.length}
                      aria-valuenow={countRatings[rating]}
                    >
                      {remainingPercentage > 0 && (
                        <div
                          className="remaining-progress"
                          style={{
                            width: `${remainingPercentage}%`,
                          }}
                        ></div>
                      )}
                      {percentage > 0 && (
                        <div
                          className="filled-progress"
                          style={{
                            width: `${percentage}%`,
                          }}
                        ></div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
  
          <div className="review-container">
            {currentReviews && currentReviews.map((item, index) => (
              <div key={index} className="review">
                <b>{item?.postedby}</b>
                <div className="d-flex gap-10 align-items-center">
                  <ReactStars
                    count={5}
                    size={24}
                    value={item?.star}
                    edit={false}
                    isHalf={true}
                    activeColor="#ffd700"
                    aria-valuemin={0}
                    aria-valuemax={5}
                    aria-valuenow={item?.star}
                  />
                </div>
                <p className="mt-3">{item?.comment}</p>
              </div>
            ))}
          </div>
  
          <div className="pagination">
            <MdKeyboardArrowLeft className="review-arrow" onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}/>
            <span>{`Page ${currentPage} of ${totalPages}`}</span>
            <MdKeyboardArrowRight className="review-arrow" onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}/>

          </div>
        </div>
      </>
    );
  };
  
  const [firstRender, setFirstRender] = useState(true); // Track the first render

  const handleImg = (newIndex) => {
    // Prevent the animation if the same image is clicked
    if (newIndex === activeImageIndex) return;

    const direction = newIndex > activeImageIndex ? 'next' : 'prev';
    setSlideDirection(''); // Reset slide direction for re-rendering the animation

    setTimeout(() => {
      setSlideDirection(direction); // Set the new slide direction
      setActiveImageIndex(newIndex); // Update the active image index
    }, 10);
  };

  useEffect(() => {
    setFirstRender(false);
  }, []);
  


  const uploadCart = () => {

      const payload = {
        productId: productState?._id,
        quantity,
        price,
      };

      dispatch(addProdToCart(payload));
     
    }
 
    useEffect(() => {
      dispatch(getUserProductWishlist()); // Fetch the wishlist on component mount
    }, [dispatch]);

    useEffect(() => {
      if (wishlistState?.wishlist?.length > 0 && getProductId) {
        // Check if the product with getProductId is in the wishlist array
        const isProductInWishlist = wishlistState.wishlist.some(
          (item) => item._id === getProductId
        );
        
        console.log("Wishlist state:", wishlistState.wishlist);
        console.log("getProductId:", getProductId);
        console.log("isProductInWishlist:", isProductInWishlist);
        
        if (isProductInWishlist) {
          setAlreadyAddedToWishlist(true);
        } else {
          setAlreadyAddedToWishlist(false);
        }
      }
    }, [wishlistState, getProductId]);


    const removeFromWishlist = async () => {
      await dispatch(addToWishlist(getProductId)); // Assuming addToWishlist handles removal
      toast.success("Item Removed from Wishlist");
      dispatch(getUserProductWishlist()); // Re-fetch wishlist after removal
      setIsWishlistActive(false);
      setAlreadyAddedToWishlist(false);
    };

            

  
    const handleAddToWishlist = async () => {
      if (!authState?.user) {
        toast.error("Please login to add product to wishlist");
        return;
      }
  
      try {
        if (alreadyAddedToWishlist) {
          // Remove from wishlist if already added
          await removeFromWishlist();
        } else {
          // Add to wishlist if not already added
          await dispatch(addToWishlist(getProductId));
          toast.success("Product added to wishlist");
          setAlreadyAddedToWishlist(true);
          setIsWishlistActive(true);
        }
      } catch (error) {
        toast.error("Failed to add/remove product to/from wishlist");
      }
    };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const [isImageLoading, setIsImageLoading] = useState(true);
  const mainProductImage = loader;

 
  const [selectedSize, setSelectedSize] = useState(null);
  const [price, setPrice] = useState(null);
  

  useEffect(() => {
    if (productState?.pricePerSize && Array.isArray(productState.pricePerSize) && productState.pricePerSize.length > 0 && !price) {
      const minPriceSize = productState.pricePerSize.reduce((prev, current) => (current.price < prev.price ? current : prev));
      setSelectedSize(minPriceSize._id); // Set default size to the minimum price size
      setPrice(minPriceSize.price); // Set default price to the minimum price
    }
  }, [productState, price]); // Runs when productState or price changes
  
  


const handleSizeChange = (e) => {
  const selectedSizeData = productState?.pricePerSize.find(
    (item) => item._id === e.target.value // Find the selected size by its _id
  );
  if (selectedSizeData) {
    setSelectedSize(selectedSizeData._id); // Update the selected size
    setPrice(selectedSizeData.price); // Update the price based on the selected size
  } else {
    console.warn('Selected size not found:', e.target.value); // Handle case where the size is not found
  }
};


  return (
    <>
      <Meta title={productState?.title} />
      <section className="breadcrumb-el-1">
      <BreadCrumb3 title={productState?.title} />

      </section>
      <BackToTop />
      <Container class1="card-wrapper   home-wrapper-2 ">

      <div className="cart-row ">
      <div className="col-12 ">
          
      <section className="section-c ">
      <Container class1="main-product-wrapper bg-white  mb-3 home-wrapper-2">
   
          <div className=" single-product">
            <div className="col-12">
        <div className="col-6 pr-image">
          {isDesktop ? (
          <div className="s-images-container">
          <div className={`main-product-image ${!firstRender ? slideDirection : ''}`}>
          <img
          src={
            isImageLoading
              ? loader
              : productState?.images[activeImageIndex]?.url || loader 
          }
          alt="Main Product"
          id="main-img"
          loading="lazy"
          onLoad={() => setIsImageLoading(false)} 
          onError={() => {
            setIsImageLoading(true);
            console.error("Error loading image");
          }} 
          style={{ width: "100%", height: "auto" }} 
        />

          </div>

          <div className="other-product-images d-flex flex-wrap">
            {productState?.images.map((image, index) => (
              <div
                key={index}
                onClick={() => handleImg(index)}
                className={`other-product-image ${index === activeImageIndex ? 'active' : ''}`}
              >
                <img
                  src={image.url}
                  className="img-fluid small-img"
                  alt={`Product Image ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
          ) : (
            <div className="s-images-container mobile-images-container">
              <div className="main-product-imagex">
                <div className="mobile-image-wrapper">
                  {productState?.images.map((image, index) => (
                    <img
                      key={index}
                      src={image.url}
                      className="img-fluid small-img"
                      alt={`Product Image ${index + 1}`}
                      onClick={() => handleImg(image.url)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
          <div className="col-6 prod-details">
            <div className="main-product-details">
              <div className="border-bottom">
                <h3 className="title">
                  {productState?.title}
                </h3>
              </div>
              <div className="border-bottom py-3">
              <p className="price">KES {parseInt(price).toLocaleString()}</p> {/* Format price with comma */}
                <div className="d-flex align-items-center gap-10">
                {averageRating !== 0 && (
              <ReactStars
                count={5}
                size={24}
                value={averageRating}
                isHalf={true}
                edit={false}
                activeColor="#ffd700"
              />
            )}

                  <p className="mb-0 t-review">({totalReviews} Reviews)</p>
                </div>
                <a className="review-btn" href="#review">
                  Write a Review
                </a>
              </div>
              <div className=" py-3">
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Type :</h3>
                  <p className="product-data">{productState?.type}</p>
                </div>


                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Category :</h3>
                  <p className="product-data">{productState?.category}</p>
                </div>

                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Availablity :</h3>
                  <p className="product-data">{productState?.stock}</p>
                </div>
          
          
                  
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">ABV :</h3>
                  <p className="product-data abv-card">{productState?.abv}%</p>
                </div>
                {
                  alreadyAdded === false && <>
                <div className="d-flex flex-column color-div py-3 mb-3 gap-10 size-wrapper">
                <h3>Available Volumes</h3>
                <Radio.Group className="Radio-group" onChange={handleSizeChange} value={selectedSize}>
            {productState?.pricePerSize && Array.isArray(productState.pricePerSize) && productState.pricePerSize.length > 0 ? (
              productState.pricePerSize.map((item) => (
                <Radio.Button key={item._id} value={item._id}>
                  {item.size.title} @ KES {item.price.toLocaleString()}
                </Radio.Button>
              ))
            ) : (
              <Radio.Button disabled>No volumes available</Radio.Button>
            )}
          </Radio.Group>
              </div>
              </>  }
  

                {productState?.stock !== "Out of Stock" ? (
  <>
<div className={`d-flex quantity-container gap-15 ${isDesktop ? 'justify-content-between' : ''}`}>
<div className="d-flex align-items-center justify-content-center gap-15 flex-row mt-2 mb-3">
    {!alreadyAdded && (
      <>
        <h3 className="product-heading">Quantity :</h3>
        <div className="">
          <div className="q-btn">
            <button onClick={decrementQuantity}>
              <FaMinus />
            </button>
            <input
              type="text"
              value={quantity}
              readOnly
              style={{ width: "50px", flex: "1", border: "none", textAlign: "center" }}
            />
            <button onClick={incrementQuantity}>
              <FaPlus />
            </button>
          </div>
        </div>
      </>
    )}
  </div>

  <div className={alreadyAdded ? "ms-0" : "ms-5 d-flex align-items-center c-btn gap-30 ms-5"}>
    <button
      className="button cart-btn-el border-0"
      type="submit"
      onClick={() => {
        if (!authState?.user) {
          toast.error("Please login to add product to cart");
          return;
        }

        alreadyAdded ? navigate('/cart') : uploadCart();
      }}
    >
      {alreadyAdded ? "Go To Cart" : "Add to Cart"}
    </button>
  </div>
</div>


<div className="whatsapp-btn-container">
  <button
    className="border-0"
    onClick={() => {
      const businessName = "Synergy Vines";
      const productTitle = productState?.title || 'N/A';
      const selectedPrice = price || 'N/A';  // Use selected price here
      const productUrl = `https://toptier-office.onrender.com/product/${productState?.slug}`;

      const message = encodeURIComponent(`
        Hello ${businessName}, I would like to buy ${productTitle}, KES. ${selectedPrice.toLocaleString()}, ${productUrl}
      `);

      const phoneNumber = "254746878028";
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

      window.open(whatsappUrl, '_blank');
    }}
  >
    <FaWhatsapp className="whatsapp-icon" /> Order on WhatsApp
  </button>
</div>

  </>
) : (
  <div className="stock-container">
  <button className="button border-0 out-of-stock-btn" disabled>
    Out of Stock
  </button>
  </div>

)}
                
         
                <div className="d-flex flex-column align-items-start mt-5 gap-15">
                <div>
                {isWishlistActive || alreadyAddedToWishlist ? (
                  <AiFillHeart
                    className="fs-5 me-2 fill-heart orange"
                    onClick={handleAddToWishlist}
                  />
                ) : (
                  <AiOutlineHeart className="fs-5 me-2" onClick={handleAddToWishlist} />
                )}
                {alreadyAddedToWishlist ? "Go to Wishlist" : "Add to Wishlist"}
              </div>
            </div>

              
                     

                <div className="d-flex gap-10 align-items-center my-3">
                  <h3 className="product-heading">Product Link:</h3>
                  <a
                    href="javascript:void(0);"
                    onClick={() => {
                      copyToClipboard(
                        window.location.href
                      );
                    }}
                  >
                    Copy Product Link
                  </a>
                </div>


     
              </div>
            </div>
          </div>
       

   
            </div>
 
        </div>
       
        </Container>
        
      


          
        <section className="col-12 product-description justify-content-between position-relative about-item mb-3 d-flex">
           <div className="d-column  desc-col-1  gap-15">
           <div id="description" className="bg-white p-3 description">
        <ul className="d-flex description-sidebar align-items-center">
          <li className="li desc-header"><a href="#description">Description</a></li>
          <li className="li"><a href="#specifications">Specifications</a></li>
          <li className="li"><a href="#review">Reviews</a></li>
          <li className="li"><a href="#related-products">Related Products</a></li>
        </ul>
              <p  dangerouslySetInnerHTML={{
                  __html: productState?.description }}>
              
              </p>

              <div className="desc-image">
             <div>
             {productState?.descImages.map((image, index) => (
          <Zoom key={index}>
            <img
              src={image.url}
              className="img-fluid"
              alt=""
            />
          </Zoom>
        ))}

             
              </div>
            
                </div>
                {productState?.youtubeLink && (
  <div className="ratio ratio-16x9">
    <iframe src={productState?.youtubeLink} title="YouTube video" allowFullScreen></iframe>
  </div>
)}

            </div>
            <div className="bg-white p-3 specifications">
            <h4 id="specifications">Specifications</h4>
             <div>
              <h3>Key Features</h3>
              <p  dangerouslySetInnerHTML={{
                  __html: productState?. specifications }}>
              
              </p>
             </div>
            </div>

   

           </div>
         


      
         
         
          </section>
      



     <Container class1="reviews-wrapper home-wrapper-2">
        <div className="">
          <div className="col-12">
            <h3 id="review">Reviews</h3>
            <div className="review-inner-wrapper">
              <div className="review-head d-flex justify-content-between align-items-end">
                <div>
                  <h4 className="mb-2">Customer Reviews</h4>
                  <div className="d-flex align-items-center gap-10">
                  {averageRating !== 0 && (
                    <ReactStars
                      count={5}
                      size={24}
                      value={averageRating}
                      isHalf={true}
                      edit={false}
                      activeColor="#ffd700"
                    />
                  )}
                <span>({totalReviews} reviews)</span>
                  </div>
                </div>
                {orderedProduct && (
                  <div className="write-review">
                    <a className="text-dark text-decoration-underline" href="#write-review">
                      Write a Review
                    </a>
                  </div>
                )}
              </div>
              <div className="review-form py-4">
              <h4 id="write-review">Write a Review</h4>
              <div>
                <ReactStars
                  count={5}
                  size={24}
                  value={star || 0} // Bind star rating to state
                  ishalf={true}
                  edit={true}
                  isHalf={true}
                  activeColor="#ffd700"
                  onChange={(e) => {
                    setStar(e);
                  }}
                />
              </div>
              <div>
                <textarea
                  name="comment"
                  id="comment"
                  className="w-100 form-control"
                  cols="30"
                  rows="4"
                  placeholder="Comments"
                  value={comment} // Bind comment to state
                  onChange={(e) => setComment(e.target.value)} // Update state on change
                ></textarea>
              </div>
              <div className="submit-btn d-flex justify-content-end mt-3">
                <button onClick={handleRating} className="button border-0" type="button">
                  Submit Review
                </button>
              </div>
            </div>
              <div className=" reviews mt-4">
              {renderProductReviews()}
              </div>
            
            </div>
          </div>
        </div>
      </Container>


               <section id="related-products" className=" recently-viewed-container  justify-content-center d-flex w-100 flex-column  align-items-center">
      {
        isDesktop  ? (
          <div className="w-100 other-products-container">
          <RecentlyViewedProducts/>
          <RelatedProducts/>

          </div>

        ):(
          <div className="w-100 other-products-container">
            <div>
            {recentlyViewed.length > 0 && (
        <div className='w-100 d-flex justify-content-start'>
          <h2 className="related-products-heading">Recently Viewed Products</h2>
        </div>
      )}
          <RecentlyViewedProducts2/>
            </div>

          <div>
          {relatedProducts.length > 0 && (
        <div className='w-100 d-flex justify-content-start'>
          <h2 className="related-products-heading">You may also like</h2>
        </div>
      )}
          <RelatedProducts2/>
          </div>



          </div>

        )
      }


      </section>         
      </section>
      

      <section className="breadcrumb-el-2 ">
        <div>
          <h1>You are here</h1>
        </div>
      <BreadCrumb3 title={productState?.title} />

      </section>
      </div>
      </div>
     </Container>
    </>
  );
  
};

export default SingleProduct;
