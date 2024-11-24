import React, { useEffect,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux"
import { useFormik } from 'formik'
import * as yup from "yup"
import { addAddress, getAddress } from "../features/user/userSlice";
import ProfileBreadCrumb from "../components/ProfileBreadCrumb";
import Meta from "../components/Meta";

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

const Address = () => {
  const dispatch = useDispatch()
  const authState=useSelector(state=>state.auth)
  const addressState=useSelector(state=>state.auth.address)

  const navigate=useNavigate()
 
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

 

const formik = useFormik({
    enableReinitialize:true,

    initialValues: {
      firstName: addressState && addressState.firstName ? addressState.firstName : "",
      lastName:addressState && addressState.lastName ? addressState.lastName : "",
      address:addressState && addressState.address ? addressState.address : "",
      other: addressState && addressState.other ? addressState.other : "",
      area: addressState && addressState.area ? addressState.area : "",
      county:addressState && addressState.county ? addressState.county : "",
      phoneNumber:addressState && addressState.phoneNumber ? addressState.phoneNumber : "",
      additionalNumber: addressState && addressState.additionalNumber ? addressState.additionalNumber : ""
        },
    validationSchema: shippingSchema,
    onSubmit:  (values) => {
      dispatch(addAddress(values));
    },
  });

 
  return (
    <>
      <Meta title={"Shipping Address"} />

    <ProfileBreadCrumb title="Shipping Address" />

      <Container class1="checkout-wrapper px-5  py-5 mt-3 home-wrapper-2">
        <div className="justify-content-center  d-flex">
          <div className="col-7 address-container bg-white p-5">
            <div className="d-flex justify-content-center flex-column address-data">
             
             
              <h4 className="mb-3  w-100 text-center">Shipping Address</h4>
              <form onSubmit={formik.handleSubmit}
                action=""
                className="d-flex gap-15 flex-wrap justify-content-between"
              >
                <div className="w-100">
                  <select name="county" value={formik.values.county} onChange={formik.handleChange("county")} onBlur={formik.handleBlur("county")} className="form-control form-select" id="">
                    <option value="" selected disabled>
                      Select County
                    </option>
                    <option value="India" >
                      Kenya
                    </option>
                  </select>
                  <div className="error ms-2 my-1">
                    {
                      formik.touched.county && formik.errors.county
                    }
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
                    {
                      formik.touched.firstName && formik.errors.firstName
                    }
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
                    {
                      formik.touched.lastName && formik.errors.lastName
                    }
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
                    {
                      formik.touched.address && formik.errors.address
                    }
                  </div>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Apartment, Suite ,etc"
                    className="form-control"
                    name="other"
                    value={formik.values.other}
                    onChange={formik.handleChange("other")}
                    onBlur={formik.handleBlur("other")}
                  />
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Town/Area"
                    className="form-control"
                    name="area"
                    value={formik.values.area}
                    onChange={formik.handleChange("area")}
                    onBlur={formik.handleBlur("area")}
                  />
                  <div className="error ms-2 my-1">
                    {
                      formik.touched.area && formik.errors.area
                    }
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
                  <Link to="/my-account" className="button" type="button" >Back</Link>

                    <button className="button" type="submit" >Save Address</button>



                  </div>
                </div>
              </form>
            </div>
          </div>
         
        </div>
      </Container>
    </>
  );
};

export default Address;