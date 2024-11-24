import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../features/pcategory/pcategorySlice";
import Dropzone from "react-dropzone";
import { uploadImg, uploadVideo, delImg, deleteVideo } from "../features/upload/uploadSlice";
import { createProperty, resetState } from "../features/property/propertySlice"; // Updated import
  

let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  specifications: yup.string().required("Specifications is Required"),
  price: yup.number().required("Price is Required"),
  type: yup.string().required("Type is Required"),
  category: yup.string().required("Category is Required"),
  tags: yup.string().required("Tag is Required"),
  propertyRef: yup.string().required("Property Ref is Required"),
  location: yup.string().required("Location is Required"),
  bathtubs: yup.number().required("Bathubs Number is Required"),
  bedrooms: yup.number().required("Bedrooms Number is Required"),
  location: yup.string().required("Location is Required"),
  firstName: yup.string().required("Agent;s First Name is Required"),
  lastName: yup.string().required("Agent's Last Name is Required"),
  phoneNumber: yup.number().required("Agent's Phone Number is Required"),
});


const Addproperty = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(getCategories());
  }, []);


 const catState = useSelector((state) => state.pCategory.pCategories);
 const imgState = useSelector((state) => state.upload.images);
 const videosState = useSelector((state) => state.upload.videos); // Add this line

  const newProperty = useSelector((state) => state.property);
  const { isSuccess, isError, isLoading, createdProperty } = newProperty;

  
  useEffect(() => {
    if (isSuccess && createdProperty) {
      toast.success("Product Added Successfullly!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);
 
  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

 
useEffect(() => {
  formik.values.images = imgState;
  formik.values.videos = videosState; // Add this line
}, [imgState, videosState]);


  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      specifications:"",
      price: "",
      type:"",
      category: "",
      tags: "",
      images: "",
      videos: [],
      propertyRef:"",
      location:"",
      bathtubs:"",
      bedrooms:"",
      location:"",
      firstName:"",
      lastName:"",
      phoneNumber:"",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createProperty(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });


  return (
    <div>
      <h3 className="mb-4 title">Add Property</h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <CustomInput
            type="text"
            label="Enter Product Title"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <div className="">
            <ReactQuill
              theme="snow"
              name="description"
              onChange={formik.handleChange("description")}
              value={formik.values.description}
            />
          </div>
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>


          <div className="">
            <ReactQuill
              theme="snow"
              name="specifications"
              onChange={formik.handleChange("specifications")}
              value={formik.values.specifications}
            />
          </div>
          <div className="error">
            {formik.touched.specifications && formik.errors.specifications}
          </div>
     
     
    
          <CustomInput
            type="number"
            label="Enter Product Price"
            name="price"
            onChng={formik.handleChange("price")}
            onBlr={formik.handleBlur("price")}
            val={formik.values.price}
          />
          <div className="error">
            {formik.touched.price && formik.errors.price}
          </div>

          
        
          <select
            name="type"
            onChange={formik.handleChange("type")}
            onBlur={formik.handleBlur("type")}
            value={formik.values.type}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="" disabled>
              Select Type
            </option>
            <option value="interior-design">Interior Design</option>
          </select>
          <div className="error">
            {formik.touched.type && formik.errors.type}
          </div>

          <select
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Select Category</option>
            {catState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>

          <select
            name="tags"
       
            onChange={formik.handleChange("tags")}
            onBlur={formik.handleBlur("tags")}
            value={formik.values.tags}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="premier-league">Premier League</option>
            <option value="bundesliga">Bundesliga</option>
            <option value="bundesliga">La Liga</option>
            <option value="serie-A">Serie A</option>
            <option value="featured">Featured</option>
            <option value="popular">Popular</option>
            <option value="men-shoes">Men Shoes</option>
            <option value="women-shoes">Women Shoes</option>
            <option value="special">Special</option>
            <option value="new-arrivals">New Arrivals</option>
            <option value="new-arrivals2">New Arrivals2</option>
            <option value="new-arrivals3">New Arrivals3</option>
            <option value="laptop">Laptop</option>
            <option value="top-ranking">Top Ranking</option>
            <option value="top-ranking2">Top Ranking 2</option>
            <option value="top-ranking3">Top Ranking 3</option>
            <option value="spring-new-arrivals">Spring New Arrivals</option>
          </select>
          <div className="error">
            {formik.touched.tags && formik.errors.tags}
          </div>

          <CustomInput
          type="number"
           label="Enter Bathtubs Number"
           name="bathtubs"
           onChng={formik.handleChange("bathtubs")}
           onBlr={formik.handleBlur("bathtubs")}
           val={formik.values.bathtubs}
            // Pass the abv prop
          />
            <div className="error">
            {formik.touched.bathtubs && formik.errors.bathtubs}
          </div>

          <CustomInput
          type="number"
           label="Enter Bedrooms Number"
           name="bedrooms"
           onChng={formik.handleChange("bedrooms")}
           onBlr={formik.handleBlur("bedrooms")}
           val={formik.values.bedrooms}
            // Pass the abv prop
          />
            <div className="error">
            {formik.touched.bedrooms && formik.errors.bedrooms}
          </div>

          <CustomInput
          type="text"
           label="Enter Location"
           name="location"
           onChng={formik.handleChange("location")}
           onBlr={formik.handleBlur("location")}
           val={formik.values.location}
            // Pass the abv prop
          />
            <div className="error">
            {formik.touched.location && formik.errors.location}
          </div>

          <CustomInput
          type="text"
           label="Enter Property Ref"
           name="propertyRef"
           onChng={formik.handleChange("propertyRef")}
           onBlr={formik.handleBlur("propertyRef")}
           val={formik.values.propertyRef}
            // Pass the abv prop
          />
            <div className="error">
            {formik.touched.propertyRef && formik.errors.propertyRef}
          </div>

          <CustomInput
          type="text"
           label="Enter Agent First Name"
           name="firstName"
           onChng={formik.handleChange("firstName")}
           onBlr={formik.handleBlur("firstName")}
           val={formik.values.firstName}
            // Pass the abv prop
          />
            <div className="error">
            {formik.touched.firstName && formik.errors.firstName}
          </div>  

         <CustomInput
          type="text"
           label="Enter Agent Last Name"
           name="lastName"
           onChng={formik.handleChange("lastName")}
           onBlr={formik.handleBlur("lastName")}
           val={formik.values.lastName}
            // Pass the abv prop
          />
            <div className="error">
            {formik.touched.lastName && formik.errors.lastName}
          </div>       


          <CustomInput
          type="number"
           label="Enter Phone Number"
           name="phoneNumber"
           onChng={formik.handleChange("phoneNumber")}
           onBlr={formik.handleBlur("phoneNumber")}
           val={formik.values.phoneNumber}
            // Pass the abv prop
          />
            <div className="error">
            {formik.touched.phoneNumber && formik.errors.phoneNumber}
          </div>

          <div className="bg-white border-1 p-5 text-center">
          <Dropzone
              onDrop={(acceptedFiles) => {
                const imageFiles = acceptedFiles.filter((file) =>
                  file.type.startsWith("image/")
                );
                const videoFiles = acceptedFiles.filter((file) =>
                  file.type.startsWith("video/")
                );

                if (imageFiles.length > 0) {
                  dispatch(uploadImg(imageFiles));
                }

                if (videoFiles.length > 0) {
                  dispatch(uploadVideo(videoFiles));
                }
              }}
            >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
              </section>
            )}
          </Dropzone>

          </div>
          <div className="showimages d-flex flex-wrap gap-3">
            {imgState?.map((i, j) => (
              <div className="position-relative" key={j}>
                <button
                  type="button"
                  onClick={() => dispatch(delImg(i.public_id))}
                  className="btn-close position-absolute"
                  style={{ top: "10px", right: "10px" }}
                ></button>
                <img src={i.url} alt="" width={200} height={200} />
              </div>
            ))}

            {videosState?.map((i,j) => (
              <div className="position-relative" key={j}>
                <button
                  type="button"
                  onClick={() => dispatch(deleteVideo(i.public_id))}
                  className="btn-close position-absolute"
                  style={{ top: "10px", right: "10px" }}
                ></button>
                <video controls width={200} height={200}>
                <source src={i.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ))}
          </div>


          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproperty;
