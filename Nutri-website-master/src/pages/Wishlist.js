import React, { useEffect } from "react";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getUserProductWishlist } from "../features/user/userSlice";
import { addToWishlist } from "../features/products/productSlice";
import { Link } from "react-router-dom";
import RecentlyViewedProducts from "../components/RecentlyViewedProducts";
import ProfileBreadCrumb from "../components/ProfileBreadCrumb";
import RecentlyViewedProducts2 from "../components/RecentlyViewedProducts2";
import { useMediaQuery } from 'react-responsive';

const Wishlist = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getWishlistFromDb();
  }, []);

  const getWishlistFromDb = () => {
    dispatch(getUserProductWishlist());
  };
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const recentlyViewed = useSelector((state) => state.auth.recentlyViewed);

  const wishlistState = useSelector((state) => state?.auth?.wishlist?.wishlist);

  const removeFromWishlist = async (id) => {
    await dispatch(addToWishlist(id));
    setTimeout(() => {
      dispatch(getUserProductWishlist());
    }, 100);
  };

  return (
    <>
      <Meta title={"Wishlist"} />
      <ProfileBreadCrumb title="Wishlist" />
      <Container class1="wishlist-wrapper home-wrapper-2 mt-3">
        <div className="row gap-10">
          <div className="col-12 ">
          {wishlistState && wishlistState.length === 0 && (
           <div className="px-5 wishlist-el">
              <div className="text-center py-3 bg-white fs-3">
                <img
                  className="wishlist-image"
                  src="https://img.freepik.com/premium-photo/3d-clipboard-with-shopping-cart_165073-892.jpg?w=740"
                  alt="wishlist-icon"
                />
                <p>Currently Your Wishlist is Empty!</p>
                <Link to="/" className="button">Add Products</Link>
              </div>
    
            </div>
          )}

          {/* Wrap all wishlist items inside one main container */}
          {wishlistState && wishlistState.length > 0 && (
           <div className="px-5 wishlist-el">
           <div className="wishilist-main-wrapper bg-white">
              <h1>My Wishlist</h1>
               <div className="d-flex p-3">
              {/* Iterate over wishlist items */}
              {wishlistState.map((item, index) => {
                const percentageDifference = Math.round(
                  ((item.previousPrice - item.price) / item.previousPrice) * 100
                );

                return (
                  <div className="col-3 bg-white" key={index}>
                    <div className="wishlist-card position-relative">
                      <img
                        onClick={() => removeFromWishlist(item?._id)}
                        src="images/cross.svg"
                        alt="cross"
                        className="position-absolute cross img-fluid"
                      />
                      <div className="wishlist-card-image bg-white">
                        <img
                          src={
                            item?.images[0].url
                              ? item?.images[0].url
                              : "images/watch.jpg"
                          }
                          className="img-fluid d-block mx-auto"
                          alt="product"
                          width={160}
                        />
                      </div>
                      <div className="percentage-difference">
                        -{percentageDifference}%
                      </div>
                      <div className="product-details">
                        <h6 className="brand">{item?.category}</h6>
                        <h5 className="product-title">{item?.title}</h5>
                        <p className="price">KES {item?.price.toLocaleString()}</p>
                        <p className="price previous-price">
                          KES {item?.previousPrice.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
               </div>

            </div>
            </div>
          )}

          {/* Render recently viewed products */}
          <section className="px-5 mt-3 recently-viewed-section justify-content-center d-flex w-100 flex-column align-items-center">
           {isDesktop ? (
          <RecentlyViewedProducts />
           ) : (
            <div className="w-100 other-products-container">
            <div>
            {recentlyViewed.length > 0 && (
            <div className='w-100 d-flex justify-content-start'>
              <h2 className="related-products-heading">Recently viewed products</h2>
            </div>
          )}
           <RecentlyViewedProducts2/>
            </div>
    
     
           </div>
           )}
          
          </section>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Wishlist;
