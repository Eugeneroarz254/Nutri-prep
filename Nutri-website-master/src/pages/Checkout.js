import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from 'formik';
import * as yup from "yup";
import { createAnOrder, deleteUserCart, getAddress, resetState } from "../features/user/userSlice";
import Meta from "../components/Meta";
import { GrFormNext } from "react-icons/gr";
import { base_url } from "../utils/axiosConfig";
import axios from "axios";
import warningImg from "../images/warning-img.png"
import { areasByCounty } from "../utils/AreasData";

const shippingSchema = yup.object({
  firstName: yup.string().required("First Name is Required"),
  lastName: yup.string().required("Last Name is Required"),
  county: yup.string().required("County is Required"),

  address: yup.string().required("Address Details are Required"),
  other: yup.string(),
  area: yup.string().required("Area is Required"),
  phoneNumber: yup.number().required("Phone Number is Required"),
  additionalNumber: yup.string(),
});

const Checkout = () => {
  const dispatch = useDispatch();
  const cartState = useSelector(state => state.auth.cartProducts);
  const authState = useSelector(state => state.auth);
  const addressState = useSelector(state => state.auth.address);

  const [totalAmount, setTotalAmount] = useState(null);
  const [shippingInfoState, setShippingInfoState] = useState(null);
  const [cartProductState, setCartProductState] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum = sum + (Number(cartState[index].quantity) * cartState[index].price);
    }
    setTotalAmount(sum);
  }, [cartState]);

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

  const getCustomerfromLocalStorage = localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    : null;

  const userId = getCustomerfromLocalStorage ? getCustomerfromLocalStorage._id : null;

  useEffect(() => {
    dispatch(getAddress(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (authState?.orderedProduct?.order !== null && authState?.orderedProduct?.success === true) {
      navigate("/my-orders")
    }
  },[authState])


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: addressState?.firstName || "",
      lastName: addressState?.lastName || "",
      county: addressState?.county || "",
      address: addressState?.address || "",
      other: addressState?.other || "",
      area: addressState?.area || "",
      phoneNumber: addressState?.phoneNumber || "",
      additionalNumber: addressState?.additionalNumber || "",

    },
    validationSchema: shippingSchema,
    onSubmit: (values) => {
      setShippingInfoState(values);
      createOrder(values);
    },
  });

  useEffect(() => {
    try {
      let items = [];
      for (let index = 0; index < cartState?.length; index++) {
        const cartItem = cartState[index];
        const item = {
          product: cartItem.productId._id,
          quantity: cartItem.quantity,
          price: cartItem.price,
          color: cartItem.color ? cartItem.color._id : 'N/A',
          size: cartItem.size ? cartItem.size._id : 'N/A',
        };
        items.push(item);
      }
      setCartProductState(items);
    } catch (error) {
      console.error('Error in useEffect:', error);
    }
  }, [cartState]);

  const [isProcessing, setIsProcessing] = useState(false);


  const createOrder = async (shippingInfo) => {
    try {
      setIsProcessing(true); // Start processing
  
      const processedOrderItems = cartProductState.map((item) => ({
        ...item,
        size: item.size === "N/A" ? null : item.size,
        color: item.color === "N/A" ? null : item.color,
      }));
  
      await dispatch(
        createAnOrder({
          totalPrice: totalAmount,
          totalPriceAfterDiscount: totalCost,
          orderItems: processedOrderItems,
          shippingInfo,
        })
      );
  
      setShippingInfoState({
        firstName: '',
        lastName: '',
        county: '',
        address: '',
        other: '',   
        area: '',
        phoneNumber: '',
        additionalNumber: '',
      });
  
      dispatch(deleteUserCart(config2));
      localStorage.removeItem("address");
      dispatch(resetState());
      setIsProcessing(false);
      navigate("/my-orders");
  
    } catch (error) {
      console.error('Error creating order or notifying admin:', error);
    }
  };


  
  const [filteredAreas, setFilteredAreas] = useState([]);
  const [selectedCounty, setSelectedCounty] = useState(""); // State to track selected county


  const counties = Object.keys(areasByCounty);

  useEffect(() => {
    setFilteredAreas(areasByCounty[selectedCounty] || []);
    formik.setFieldValue("area", ""); // Reset area field when county changes
  }, [selectedCounty]);

  const handleCountyChange = (event) => {
    const selectedCounty = event.target.value;
    setSelectedCounty(selectedCounty); // Update selected county state
    formik.handleChange("county")(event);
  };





  const totalCartValue = Array.isArray(cartState) 
    ? cartState.reduce((total, item) => total + item.quantity * item.price, 0)
    : 0;
  const totalCost = totalCartValue ;
  
  return (
<>
  <Meta title={"Checkout"} />

  <Container class1="checkout-wrapper py-5 home-wrapper-2">
    <div className="row">
      <div className="col-7">
        <div className="checkout-left-data">
          <nav
          className="py-4"
            style={{ "--bs-breadcrumb-divider": ">" }}
            aria-label="breadcrumb"
          >
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link className="text-dark total-price" to="/cart">
                   Cart
                </Link>
              </li>
              &nbsp;<GrFormNext />&nbsp;
              <li className="breadcrumb-item">
                <Link className="text-dark total-price" to="/checkout">
                  Checkout
                </Link>
              </li>
            </ol>
          </nav>
          <div className="col-5 border-bottom-container">
            <div className="border-bottom py-4">
              {cartState &&
                cartState?.map((item, index) => {
                  return (
                    <div key={index} className="d-flex bg-white checkout-product-container gap-10 mb-2 align-align-items-center">
                    <div className="w-100 d-flex gap-10">
                      <div className="img-element position-relative">
                        <span
                          style={{ top: "-10px", right: "2px" }}
                          className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                        >
                          {item.quantity}
                        </span>
                        <img
                          width={100}
                          height={100}
                          src={item?.productId?.images[0]?.url}
                          alt="product"
                        />
                      </div>
                      <div className="title-element ">
                      <h5 className="pr-title">
                      {item?.productId?.title}
                  </h5>
            
                  <h5 className="total">
                        KES {(item.quantity * item.price).toLocaleString()}
                      </h5>
                      <p>Qty: {item.quantity}</p>
                        </div>
                    </div>
                
                  </div>
                  );
                })}
            </div>
            <div className="border-bottom py-4">

          <div className="d-flex flex-column delivery-wrapper-el align-items-center">
            <p className="delivery-header-el">Delivery Policy</p>
            <div className="delivery-content">
              <img src={warningImg} alt="warining"/>
              <p>We offer free delivery within Nairobi for purchases totaling KES 10,000 or more. For orders below KES 10,000, a transportation and service fee will apply, depending on the items and the delivery destination.</p>
            </div>
                </div>
          </div>
            <div className="d-flex justify-content-between align-items-center border-bottom py-4">
              <h4 className="total">Total</h4>
              <h5 className="total-price">
               KES {totalCost?.toLocaleString() || "0"}
              </h5>
            </div>
          </div>
          <h4 className="mb-3 delivery-header">Delivery address</h4>
          <form
      onSubmit={formik.handleSubmit}
      className="d-flex gap-15 flex-wrap justify-content-between"
    >
      <div className="w-100">
      <select
        name="county"
        value={selectedCounty}
        onChange={handleCountyChange}
        onBlur={formik.handleBlur("county")}
        className="form-control form-select"
      >
        <option value="" disabled>Select Region</option>
        {counties.map((county, index) => (
          <option key={index} value={county}>
            {county}
          </option>
        ))}
      </select>
        <div className="error ms-2 my-1">
          {formik.touched.county && formik.errors.county}
        </div>
      </div>

      <div className="flex-grow-1">
        <input
          type="text"
          placeholder="First Name"
          className="form-control"
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange("firstName")}
          onBlur={formik.handleBlur("firstName")}
        />
        <div className="error ms-2 my-1">
          {formik.touched.firstName && formik.errors.firstName}
        </div>
      </div>

      <div className="flex-grow-1">
        <input
          type="text"
          placeholder="Last Name"
          className="form-control"
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange("lastName")}
          onBlur={formik.handleBlur("lastName")}
        />
        <div className="error ms-2 my-1">
          {formik.touched.lastName && formik.errors.lastName}
        </div>
      </div>

      <div className="w-100">
        <input
          type="text"
          placeholder="Address"
          className="form-control"
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange("address")}
          onBlur={formik.handleBlur("address")}
        />
        <div className="error ms-2 my-1">
          {formik.touched.address && formik.errors.address}
        </div>
      </div>

      <div className="w-100">
        <input
          type="text"
          placeholder="Apartment, Suite, etc."
          className="form-control"
          name="other"
          value={formik.values.other}
          onChange={formik.handleChange("other")}
          onBlur={formik.handleBlur("other")}
        />
      </div>

      <div className="w-100">
        <select
          name="area"
          value={formik.values.area}
          onChange={formik.handleChange("area")}
          onBlur={formik.handleBlur("area")}
          className="form-control form-select"
        >
          <option value="" disabled>
            Select Area
          </option>
          {filteredAreas.map((area, index) => (
            <option key={index} value={area}>
              {area}
            </option>
          ))}
        </select>
        <div className="error ms-2 my-1">
          {formik.touched.area && formik.errors.area}
        </div>
      </div>

       <div className="flex-grow-1 d-flex number-element">
       <div className=" number-wrapper">

        <div className="number position-relative">
          <span>
            + 254
          </span>
        <input
          type="text"
          placeholder="Phone Number"
          className="form-control number-input"
          name="phoneNumber"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange("phoneNumber")}
          onBlur={formik.handleBlur("phoneNumber")}
        />
        <div className="error position-absolute ms-2 my-1">
          {formik.touched.phoneNumber && formik.errors.phoneNumber}
        </div>
        </div>
 
      </div>

      <div className="number-wrapper">

      <div className="number position-relative">
         <span>
            + 254
          </span>
        <input
          type="text"
          placeholder="Additional phone number"
          className="form-control number-input"
          name="additionalNumber"
          value={formik.values.additionalNumber}
          onChange={formik.handleChange("additionalNumber")}
          onBlur={formik.handleBlur("additionalNumber")}
        />
        <div className="error position-absolute ms-2 my-1">
          {formik.touched.additionalNumber && formik.errors.additionalNumber}
        </div>
      </div>

 
      </div>
       </div>


      <div className="w-100">
        <div className="d-flex justify-content-between align-items-center">
          <Link to="/cart" className="text-dark">
            <BiArrowBack className="me-2" />
            Return to Cart
          </Link>
          <button 
          type="submit" 
          className="button" 
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Place Order"}
        </button>

        </div>
      </div>
    </form>
        </div>
      </div>
      <div className="col-5 border-bottom-container2">
        <div className="border-bottom py-4">
          {cartState &&
            cartState?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="border-element d-flex gap-10 mb-2 align-align-items-center"
                >
                  <div className="w-75 d-flex gap-10">
                    <div className="w-25 position-relative">
                      <span
                        style={{ top: "-10px", right: "2px" }}
                        className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                      >
                        {item?.quantity}
                      </span>
                      <img
                        className="img-fluid"
                        src={item?.productId?.images[0]?.url}
                        alt="product"
                      />
                    </div>
                    <div>
                      <h5 className="total-price">
                        {item?.productId?.title}
                      </h5>
                      <p className="total-price">{item?.color?.title}</p>
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <h5 className="total">
                      KES {(item?.price * item?.quantity)?.toLocaleString() || "0"}
                    </h5>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="border-bottom py-4">

          <div className="d-flex flex-column delivery-wrapper-el align-items-center">
            <p className="delivery-header-el">Delivery Policy</p>
             <div className="delivery-content">
              <img src={warningImg} alt="warining"/>
              <p>We offer free delivery within Nairobi for purchases totaling Ksh 100,000 or more. For orders below Ksh 100,000, a transportation and service fee will apply, depending on the items and the delivery destination.</p>
             </div>
                 </div>
        </div>
        <div className="d-flex justify-content-between align-items-center border-bottom py-4">
          <h4 className="total">Total</h4>
          <h5 className="total-price">
          KES {totalCost?.toLocaleString() || "0"}
          </h5>
        </div>
      </div>
    </div>
  </Container>
</>


  );
};

export default Checkout;
