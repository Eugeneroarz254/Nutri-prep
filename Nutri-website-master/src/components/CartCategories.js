import React from 'react'
import Carousel from 'react-multi-carousel';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const CartCategories = () => {

    const productState = useSelector((state) => state.product.product);
    const navigate=useNavigate()



  return (
    <>
 
      
      
          {productState &&
            productState?.map((item, index) => {
              if (item.tags === "popular") {
                return (
                  <div key={index} className={"col-3"}>
                    <div
                      className="product-card1 position-relative"
                    >
                  
                      <div className="product-image">
                        <img
                          src={item?.images[0].url}
                          className="img-fluid  mx-auto"
                          alt="product image"
                          width={160}
                          onClick={()=>navigate("/product/"+item?._id)}
                        />
                  
                      </div>
                
                  
                    </div>
                  </div>
                );
              }
            })}
   
  
         
      
    </>
  )
}

export default CartCategories