import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import {useDispatch, useSelector} from 'react-redux'
import { deleteCartProduct, getUserCart, updateCartProduct } from "../features/user/userSlice";
import { FaPlus, FaMinus } from "react-icons/fa";
import RecentlyViewedProducts from "../components/RecentlyViewedProducts";
import { MdNavigateNext } from "react-icons/md";
import CartRelatedProducts from "../components/CartRelatedProducts";
import RecentlyViewedProducts2 from "../components/RecentlyViewedProducts2";
import { useMediaQuery } from "react-responsive";
import CartRelatedProducts2 from "../components/CartRelatedProducts2";

const Cart = () => {
 
  const getTokenFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;
  
const token = getTokenFromLocalStorage
  ? getTokenFromLocalStorage.token || getTokenFromLocalStorage.user?.token
  : "";
const config2 = {
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  },
};
 
  
const [quantity, setQuantity] = useState(1)
const isDesktop = useMediaQuery({ minWidth: 768 });

  const dispatch = useDispatch();

  const recentlyViewed = useSelector((state) => state.auth.recentlyViewed);
  const relatedProducts = useSelector((state) => state.product.relatedProducts);


  const [prodctUpdateDetail, setProdctUpdateDetail] = useState(null)
  const [totalAmount,setTotalAmount]=useState(0)
  const userCartState=useSelector(state=>state.auth.cartProducts)

  useEffect(() => {
    if (token) {

      dispatch(getUserCart(config2));
    }
  }, [token]);
  

  useEffect(() => {
    if (prodctUpdateDetail !== null) {
      dispatch(updateCartProduct({
        cartItemId: prodctUpdateDetail.cartItemId,
        quantity: prodctUpdateDetail.quantity,
        config: config2  // Ensure this is correct if you need it
      })).then(() => {
        dispatch(getUserCart(config2)); // Fetch the cart only after the update is successful
      }).catch(error => {
        console.error('Failed to update cart:', error);
      });
    }
  }, [prodctUpdateDetail]);
  


  const deleteACartProduct = (id) => {
    dispatch(deleteCartProduct({id:id,config2:config2}))
    setTimeout(() => {
      dispatch(getUserCart(config2))
    },200)
  }
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < userCartState?.length; index++) {
      sum += Number(userCartState[index].quantity) * userCartState[index].price;
    }
    setTotalAmount(sum);
  }, [userCartState]);
  

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity >= 1) {
      setProdctUpdateDetail({ cartItemId: itemId, quantity: newQuantity });
    }
  };
  
const firstProductIdInCart = userCartState && userCartState.length > 0
? userCartState[0].productId._id
: null;

  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />
      <Container class1="card-wrapper  home-wrapper-2 ">
        <div className="  cart-row">
          <div className="col-12">
          {userCartState === undefined || userCartState.length === 0 ? (
             <div>
             <div className="bg-white py-3 empty-cart-wrapper">
                <img 
                className="cart-image"
              src="https://img.freepik.com/free-vector/best-shop-supermarket-mall-cart-mobile-wheeled-shopping-trolley_39422-4.jpg?t=st=1700416514~exp=1700417114~hmac=6a16996e7f604ac2e48fec1651073282f6cb7520f5037c139918770f16d48c5b"
               alt="cart-image"
               />
                 <h3>Your Cart is Empty!</h3>
                <Link to="/" className="button">
                Start Shopping
              </Link>
              </div>
              <section className="mt-3 recently-viewed-container px-3 justify-content-center d-flex w-100 flex-column  align-items-center">
       {isDesktop ? (
       <div className="w-100">
       <RecentlyViewedProducts/>
        {firstProductIdInCart && (
          <CartRelatedProducts productIds={[firstProductIdInCart]} />
        )}
       </div>
       
       ):(
       <div className="w-100 ">
              {recentlyViewed.length > 0 && (
        <div className='w-100 d-flex justify-content-start'>
          <h2 className="recently-viewed-heading">Recently Viewed Products</h2>
        </div>
      )}
       <RecentlyViewedProducts2/>
       
       </div>
       )} 
       
          </section>
               </div>
 
        ) :
         (
              <>
            <div className="cart-header px-3 bg-white py-3 d-flex justify-content-between align-items-center">
              <h4 className="cart-col-1">Product</h4>
              <h4 className="cart-col-2">Price</h4>
              <h4 className="cart-col-3">Quantity</h4>
              <h4 className="cart-col-4 d-flex ">Total</h4>
            </div>
    
           
            {
              userCartState && userCartState?.map((item, index) => {
                return( <div key={index} className="cart-data px-3 w-100 position-relative bg-white py-3 mb-2 d-flex justify-content-between align-items-center">
               
               { isDesktop ? (
                <>
                                <div className="cart-col-1  gap-15 d-flex align-items-center">
                  <div className="w-25 d-flex align-items-center cart-image">
                    <img src={item?.productId?.images[0]?.url} className="img-fluid" alt="product image" />
                  </div>
                  <div className="w-75 cart-details1 ">
                      <p>{item?.productId.title}</p>

                  </div>
                </div>

                <div className="cart-col-2 pc">
                <h5 className="price">  KES {item?.price.toLocaleString()}</h5>
               
                </div>


                <div className="cart-col-3 d-flex align-items-center gap-15">
                <div className="d-flex pc flex-row align-items-center">
                <button onClick={() => updateQuantity(item?._id, item?.quantity - 1)}>
                    <FaMinus />
                  </button>
                  <span className="btn-qty">{item?.quantity}</span>
                  <button onClick={() => updateQuantity(item?._id, item?.quantity + 1)}>
                    <FaPlus />
                  </button>
                </div>
                
                </div>
                <div className="cart-col-4">
                <h5 className="price">  KES {item?.price.toLocaleString()}</h5>
                </div>
               
              
                <button
                onClick={()=>{deleteACartProduct(item?._id)}}
                className="position-absolute  remove-container">
                 Remove  <AiFillDelete  className="remove-icon" />
                  </button>
                </>
               ):(
                <>
                 <div className="cart-col-1  gap-15 d-flex align-items-center">
                  <div className=" d-flex align-items-center cart-image">
                    <img src={item?.productId?.images[0]?.url} className="img-fluid" alt="product image" />
                  </div>

            
                <div className="w-75 cart-details1 ">
                    
                    <div className="cart-top-element">
                    <p>{item?.productId.title}</p>
                      <h5 className="price">  KES {item?.price.toLocaleString()}</h5>
                      <p>Qty: {item?.quantity}</p>
                    </div>

                    
                      <div className="cart-bottom-element position-relative">
               <div className="quantity-element d-flex align-items-center ">
                <div className="d-flex flex-row align-items-center">
                <button onClick={() => updateQuantity(item?._id, item?.quantity - 1)}>
                    <FaMinus />
                  </button>
                  <span className="btn-qty">{item?.quantity}</span>
                  <button onClick={() => updateQuantity(item?._id, item?.quantity + 1)}>
                    <FaPlus />
                  </button>
                </div>
                
                </div>
          
               
              
                <button
                onClick={()=>{deleteACartProduct(item?._id)}}
                className=" remove-container-2">
                 Remove  <AiFillDelete  className="remove-icon" />
                  </button>
                    </div>            
                  </div>
                  </div>


                </>
               )}
              

              </div>)
              })
            } 
      
          <div className="col-12 bg-white subtotal-wrapper  py-3 mt-4">
            <div className="d-flex    justify-content-between align-items-end">
    
              <Link to="/" className="button1 ">
                Continue Shopping<MdNavigateNext />

              </Link>
         

              {
                (totalAmount !== null || totalAmount !== 0) &&
                <div className="d-flex subtotal flex-column align-items-end">
                <div className="d-fle mb-3   w-100 justify-content-between">
                  <b>Total: </b> <b>KES {totalAmount.toLocaleString()}</b>
                  </div>
                <Link to="/checkout" className="button">
                  Checkout
                </Link>
              </div>
              }
            </div>
          </div>
          <section className="py-3  recently-viewed-container px-3 justify-content-center d-flex w-100 flex-column  align-items-center">
       {isDesktop ? (
       <div className="w-100 other-products-container">
       <RecentlyViewedProducts/>
        {firstProductIdInCart && (
          <CartRelatedProducts productIds={[firstProductIdInCart]} />
        )}
       </div>
       
       ):(
       <div className="w-100 other-products-container">
        <div>
        {recentlyViewed.length > 0 && (
        <div className='w-100 d-flex justify-content-start'>
          <h2 className="related-products-heading">Recently viewed products</h2>
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
       {firstProductIdInCart && (
          <CartRelatedProducts2 productIds={[firstProductIdInCart]} />
        )}
        </div>

       </div>
       )} 
       
          </section>
          </>
          )}
              </div>
        </div>
        <div className="continue-shopping">
          
        </div>
        
      </Container>
    </>
  );
};

export default Cart;
