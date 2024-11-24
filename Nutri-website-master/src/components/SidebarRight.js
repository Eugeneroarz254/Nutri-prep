import React, { useEffect, useState } from 'react'
import ReactImageZoom from "react-image-zoom";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { addProdToCart } from '../features/user/userSlice';


const SidebarRight = () => {
    const [color, setColor] = useState(null)
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1)
    const [alreadyAdded,setAlreadyAdded]=useState(false)
    const location = useLocation();

    const navigate=useNavigate()
    const productState = useSelector(state => state?.product?.singleproduct)
    const getProductId = location.pathname.split("/")[2]
  const cartState=useSelector(state=>state?.auth?.cartProducts)
  
    const props1 = {
      width:200,
      height:200,
        zoomPosition:"bottom",
        zoomWidth: 280,
        img:  productState?.images[0]?.url ? productState?.images[0]?.url :  "https://images.gr-assets.com/hostedimages/1508973430ra/24273491.gif" ,
       
      }


      
  useEffect(() => {
    for (let index = 0; index < cartState?.length; index++) {
      if (getProductId === cartState[index]?.productId?._id) {
        setAlreadyAdded(true)
      }
    }
  },[])
 // ...

      const uploadCart = () => {

        const payload = {
          productId: productState?._id,
          quantity,
          price: productState?.price ,
        };
        console.log("Payload with size:", payload);
  
        dispatch(addProdToCart(payload));
      
      }
   
    


  return (
   <>
            <div>
           <h4>Product</h4>
           </div>
             <div className="cart2-img">
            <ReactImageZoom {...props1}/>
             </div>
             <div className="d-flex flex-column">
              <p className='previous-price'>KES {productState?.previousPrice.toLocaleString()}</p>
              <p className='price'> KES {productState?.price.toLocaleString()}</p>


              {productState?.stock !== "Out of Stock" ? (
               <div className={ alreadyAdded?"ms-0":"ms-5" + 'd-flex align-items-center  '}>
                    <button
                      className="button border-0"
                   
                      type="button"
                      onClick={()=>{alreadyAdded? navigate('/cart'):uploadCart()}}
                    >
                      {alreadyAdded?"Go To Cart" :"Add to Cart"}
                    </button>
                  </div>
                  ) : (
                    <div className="stock-container-2">
                    <button className="button border-0 out-of-stock-btn" disabled>
                      Out of Stock
                    </button>
                    </div>
                  
                  )}


               </div>
   </>
  )
}

export default SidebarRight