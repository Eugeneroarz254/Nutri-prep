import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import { useLocation, useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";
import Dropzone from "react-dropzone";
import { uploadImg, uploadVideo, delImg, deleteVideo, uploadDescImg, delDescImg, deleteDescVideo, uploadDescVideo } from "../features/upload/uploadSlice";
import { createProducts, getAProduct, resetState, updateAProduct } from "../features/product/productSlice";
import { getCategories } from "../features/fcategory/fcategorySlice";
import { getCologneBrands } from "../features/cologneBrands/cbrandSlice";
import { getSizes } from "../features/size/sizeSlice";


let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  specifications: yup.string().required("Specifications is Required"),
  price: yup.number().required("Price is Required"),
  previousPrice: yup.number().required("Previous is Required"),
  shop: yup.string().required("Shop is Required"),
  brand: yup.string().required("Brand is Required"),
  shipping:yup.string(),
  size: yup.array(),
  type: yup.string().required("Type is Required"),
  category: yup.string().required("Category is Required"),
  tags: yup.string().required("Tag is Required"),
  stock:yup.string().required("Stock availability is required"),
  quantity: yup.number().required("Quantity is Required"),
});


const AddCologne = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [size, setSize] = useState([]);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getCologneBrands())
    dispatch(getSizes()); 

  }, []);
  const [abv, setAbv] = useState("");
  const catState = useSelector((state) => state.fCategories.fCategories);
 const imgState = useSelector((state) => state.upload.images);
 const imgDescState = useSelector((state) => state.upload.descImages);
 const sizeState = useSelector((state) => state.size.sizes);

 const videosDescState = useSelector((state) => state.upload.descVideos); // Add this line
 const brandState = useSelector((state) => state.cbrand.cologneBrands);
console.log("brands",brandState)
 const videosState = useSelector((state) => state.upload.videos); // Add this line
 const location = useLocation();

 const productId = location.pathname.split("/")[3];
  const newProduct = useSelector((state) => state.product);
  console.log("product",newProduct)
  const { 
    isSuccess,
     isError, 
     isLoading,
    createdProduct,
    updatedProduct,
   productData 
    } = newProduct;



  useEffect(() => {
    if (productId !== undefined) {
      dispatch(getAProduct(productId));
    } else {
      dispatch(resetState());
    }
  }, [productId]);
  
  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Added Successfullly!");
    }
    if (isSuccess && updatedProduct) {
      toast.success("Product Updated Successfullly!");
      navigate("/admin/furniture-list");
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


  const descImg = [];
  imgDescState.forEach((i) => {
    descImg.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  const sizeopt = [];
sizeState.forEach((i) => {
  sizeopt.push({
    label: i.title,
    value: i._id,
  });
});

  
useEffect(() => {
  formik.values.images = imgState;
  formik.values.videos = videosState;
  formik.values.descImages = imgDescState;

  formik.values.descVideos = videosDescState;
  formik.values.size = size; // Include the size field

}, [ size, imgState,imgDescState, videosState,videosDescState, ]);


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: productData ? productData.title || "" : "",
      description: productData ? productData.description || "" : "",
      specifications: productData ? productData.specifications || "" : "",
      price: productData ? productData.price || "" : "",
      previousPrice: productData ? productData.previousPrice || "" : "",
      brand: productData ? productData.brand || "" : "",
      shipping: productData ? productData.shipping || "" : "",
      type: productData ? productData.type || "" : "",
      category: productData ? productData.category || "" : "",
      shop: productData ? productData.shop || "" : "",
      stock:productData ? productData.stock || "" : "",
      tags: productData ? productData.tags || "" : "",
      quantity: productData ? productData.quantity || "" : "",
      images: productData ? productData.images || [] : [],
      size: productData ? productData.size || "" : "",

      descImages: productData ? productData.descImages || [] : [],
      videos: productData ? productData.videos || [] : [],
      descVideos: productData ? productData.descVideos || [] : [],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
      if (productId !== undefined) {
        if (!values.images.length || imgState.length) {
          if (imgState.length) {
            values.images = [...imgState];
          }
        }
        if (!values.videos.length || videosState.length) {
          if (videosState.length) {
            values.videos = [...videosState];
          }
        }
        
        if (!values.descImages.length || imgDescState.length) {
          if (imgDescState.length) {
            values.descImages = [...imgDescState];
          }
        }
        
        if (!values.descVideos.length || videosDescState.length) {
          if (videosDescState.length) {
            values.descVideos = [...videosDescState];
          }
        }
        const data = { id: productId, productData: values };
        dispatch(updateAProduct(data));
        dispatch(resetState());
      } else {
      dispatch(createProducts(values));
      formik.resetForm();
      setSize(null);
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    }
  },
});

const handleSizes = (e) => {
  setSize(e); 
};

  return (
    <div>
      <h3 className="mb-4 title">
      {productId !== undefined ? "Edit" : "Add"} Cologne
      </h3>

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
            label="Enter Previous Price"
            name="previousPrice"
            onChng={formik.handleChange("previousPrice")}
            onBlr={formik.handleBlur("previousPrice")}
            val={formik.values.previousPrice}
          />
          <div className="error">
            {formik.touched.previousPrice && formik.errors.previousPrice}
          </div>

    
          <CustomInput
            type="number"
            label="Enter Current Price"
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
            <option value="Cologne">Cologne</option>
       </select>
          <div className="error">
            {formik.touched.type && formik.errors.type}
          </div>

          <select
            name="brand"
            onChange={formik.handleChange("brand")}
            onBlur={formik.handleBlur("brand")}
            value={formik.values.brand}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Select Brand</option>
            {brandState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.brand && formik.errors.brand}
          </div>

          <select
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="" disabled>Select Category</option>
            <option value="Men Perfumes">Men Perfume</option>
            <option value="Women Perfumes">Women Perfume</option>
            <option value="Unisex Perfumes">Unisex Perfume</option>
     
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>

          <select
            name="shop"
       
            onChange={formik.handleChange("shop")}
            onBlur={formik.handleBlur("shop")}
            value={formik.values.shop}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="" disabled>
              Select Shop
            </option>
            <option value="Official Store">Official Store</option>
          </select>
          <div className="error">
            {formik.touched.shop && formik.errors.shop}
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
              Select tag
            </option>
            <option value="Cologne">Cologne</option>
       </select>
          <div className="error">
            {formik.touched.tags && formik.errors.tags}
          </div>

          <select
            name="stock"
       
            onChange={formik.handleChange("stock")}
            onBlur={formik.handleBlur("stock")}
            value={formik.values.stock}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="" disabled>
              Stock Availability
            </option>
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>

       </select>
          <div className="error">
            {formik.touched.stock && formik.errors.stock}
          </div>





          <CustomInput
            type="number"
            label="Enter Product Quantity"
            name="quantity"
            onChng={formik.handleChange("quantity")}
            onBlr={formik.handleBlur("quantity")}
            val={formik.values.quantity}
          />
          <div className="error">
            {formik.touched.quantity && formik.errors.quantity}
          </div>
 
          <Select
            mode="multiple"
          allowClear
          className="w-100"
          placeholder="Select sizes"
          defaultValue={size}
          onChange={(i) => handleSizes(i)}
          options={sizeopt}
        />
        <div className="error">
          {formik.touched.size && formik.errors.size}
        </div>


          <select
            name="shipping"
            onChange={formik.handleChange("shipping")}
            onBlur={formik.handleBlur("shipping")}
            value={formik.values.shipping}
            className="form-control py-3 mb-3"
            id="">
    
            <option value="" disabled>
              Select Shipping
            </option>
            <option value="Shipped From Overseas">Shipped From Overseas</option>
            <option value="Local Shipping">Local Shipping</option>

       </select>
          <div className="error">
            {formik.touched.shipping && formik.errors.shipping}
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

          <div className="bg-white border-1 p-5 text-center">
        Description Images
          <Dropzone
              onDrop={(acceptedFiles) => {
                const imageFiles = acceptedFiles.filter((file) =>
                  file.type.startsWith("image/")
                );
                const videoFiles = acceptedFiles.filter((file) =>
                  file.type.startsWith("video/")
                );

                if (imageFiles.length > 0) {
                  dispatch(uploadDescImg(imageFiles));
                }

                if (videoFiles.length > 0) {
                  dispatch(uploadDescVideo(videoFiles));
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
            {imgDescState?.map((i, j) => (
              <div className="position-relative" key={j}>
                <button
                  type="button"
                  onClick={() => dispatch(delDescImg(i.public_id))}
                  className="btn-close position-absolute"
                  style={{ top: "10px", right: "10px" }}
                ></button>
                <img src={i.url} alt="" width={200} height={200} />
              </div>
            ))}

            {videosDescState?.map((i,j) => (
              <div className="position-relative" key={j}>
                <button
                  type="button"
                  onClick={() => dispatch(deleteDescVideo(i.public_id))}
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
            {productId !== undefined ? "Edit" : "Add"} Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCologne;
