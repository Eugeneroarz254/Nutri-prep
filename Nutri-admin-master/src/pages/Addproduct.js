import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import { useLocation, useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../features/pcategory/pcategorySlice";
import Dropzone from "react-dropzone";
import { uploadImg, uploadVideo, delImg, deleteVideo, uploadDescImg, delDescImg, deleteDescVideo, uploadDescVideo } from "../features/upload/uploadSlice";
import { createProducts, getAProduct, resetState, updateAProduct } from "../features/product/productSlice";
import { getBrands } from "../features/brand/brandSlice";
import { getSizes } from "../features/size/sizeSlice";
import { Select } from "antd";


let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  specifications: yup.string().required("Specifications is Required"),
  shop: yup.string().required("Shop is Required"),
  abv:yup.number(),
  brand: yup.string().required("Brand is Required"),
  type: yup.string().required("Type is Required"),
  category: yup.string().required("Category is Required"),
  tags: yup.string().required("Tag is Required"),
  youtubeLink:yup.string(),
  stock: yup.string(),
  pricePerSize: yup.array().of(
    yup.object().shape({
      size: yup.string().required("Size is required"),
      price: yup.number().required("Price is required"),
    })
  ).min(1, "At least one size and price is required"),
  quantity: yup.number().required("Quantity is Required"),
});


const Addproduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [size, setSize] = useState([]);
  const [abv, setAbv] = useState("");


  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
    dispatch(getSizes()); 
  }, []);

 
  const catState = useSelector((state) => state.pCategory.pCategories);
 const imgState = useSelector((state) => state.upload.images);
 const imgDescState = useSelector((state) => state.upload.descImages);
 const videosDescState = useSelector((state) => state.upload.descVideos); // Add this line
 const brandState = useSelector((state) => state.brand.brands);
 const videosState = useSelector((state) => state.upload.videos); // Add this line
 const sizeState = useSelector((state) => state.size.sizes);
 const [sizePriceFields, setSizePriceFields] = useState([{ size: "", price: "" }]);

 const location = useLocation();

 const productId = location.pathname.split("/")[3];
 

 
 const newProduct = useSelector((state) => state.product);
  
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
      navigate("/admin/list-product");
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
  
    formik.values.pricePerSize = sizePriceFields;
  }, [imgState, imgDescState, videosState, videosDescState,  sizePriceFields]);


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: productData ? productData.title || "" : "",
      description: productData ? productData.description || "" : "",
      specifications: productData ? productData.specifications || "" : "",
      type: productData ? productData.type || "" : "",
      category: productData ? productData.category || "" : "",
      abv: productData ? productData.abv || "" : "",
      brand: productData ? productData.brand || "" : "",
      shop: productData ? productData.shop || "" : "",
      stock: productData ? productData.stock || "" : "",
      youtubeLink: productData ? productData.youtubeLink || "" : "",
      tags: productData ? productData.tags || "" : "",
      quantity: productData ? productData.quantity || "" : "",
      images: productData ? productData.images || [] : [],
      descImages: productData ? productData.descImages || [] : [],
      videos: productData ? productData.videos || [] : [],
      descVideos: productData ? productData.descVideos || [] : [],
      pricePerSize: productData ? productData.pricePerSize || [{ size: "", price: "" }] : [{ size: "", price: "" }],

    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log("Product form values:", values);

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

      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    }
  },
});




const addSizePriceField = () => {
  setSizePriceFields([...sizePriceFields, { size: "", price: "" }]);
};

const removeSizePriceField = (index) => {
  const newFields = sizePriceFields.filter((_, idx) => idx !== index);
  setSizePriceFields(newFields);
};

  return (
    <div>
      <h3 className="mb-4 title">
      {productId !== undefined ? "Edit" : "Add"} Product
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
            <option value="Whisky">Whisky</option>
            <option value="Tequila">Tequila</option>
            <option value="Liqueur">Liqueur</option>
            <option value="Gin">Gin</option>
            <option value="Cognac">Cognac</option>
            <option value="Beers">Beers</option>
            <option value="Brandy">Brandy</option>
            <option value="Rum">Rum</option>
            <option value="Vodka">Vodka</option>
            <option value="Vape">Vape</option>
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
              Select Tags
            </option>
          <option value="featured">Featured</option>
            <option value="popular">Popular</option>
            <option value="New Arrivals">New Arrivals</option>
            <option value="Today Deals">Today's Deals</option>
            <option value="Best Sellers">Best Sellers</option>
            <option value="Top Picks">Top Picks</option>

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
          type="text"
          label="YouTube Link"
          name="youtubeLink"
          onChng={formik.handleChange("youtubeLink")}
          onBlr={formik.handleBlur("youtubeLink")}
          val={formik.values.youtubeLink}
        />
        <div className="error">
          {formik.touched.youtubeLink && formik.errors.youtubeLink}
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

  


        <h5>Prices for Different Sizes</h5>
        {sizePriceFields.map((field, index) => (
          <div key={index} className="different-sizes-container">
            <Select
              options={sizeState.map((size) => ({ label: size.title, value: size._id }))}
              value={field.size}
              className="w-50 size-field"
              allowClear
              onChange={(value) => {
                const newFields = [...sizePriceFields];
                newFields[index].size = value;
                setSizePriceFields(newFields);
              }}
              placeholder="Select Size"
            />

            <input
              type="number"
              className="price-input"
              placeholder="Price"
              label="Price"
              name={`pricePerSize[${index}].price`}
              onChange={(e) => {
                const newFields = [...sizePriceFields];
                newFields[index].price = e.target.value;
                setSizePriceFields(newFields);
              }}
              value={field.price} // Fixed typo here
            />

            <button type="button" onClick={() => removeSizePriceField(index)}>
              Remove
            </button>
          </div>
        ))}

        <button className="btn btn-success" type="button" onClick={addSizePriceField}>
          Add Another Size and Price
        </button>



          <CustomInput
          type="number"
           label="Enter ABV%"
           name="abv"
           onChng={formik.handleChange("abv")}
           onBlr={formik.handleBlur("abv")}
           val={formik.values.abv}
           
          />
            <div className="error">
            {formik.touched.abv && formik.errors.abv}
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


  
      {imgState && imgState.map((image, index) => (
        <div className="position-relative" key={index}>
          <button
            type="button"
            onClick={() => dispatch(delImg(image.public_id))}
            className="btn-close position-absolute"
            style={{ top: "10px", right: "10px" }}
          ></button>
          <img src={image.url} alt="" width={200} height={200} />
        </div>
      ))}

      {videosState && videosState.map((video, index) => (
        <div className="position-relative" key={index}>
          <button
            type="button"
            onClick={() => dispatch(deleteVideo(video.public_id))}
            className="btn-close position-absolute"
            style={{ top: "10px", right: "10px" }}
          ></button>
          <video controls width={200} height={200}>
            <source src={video.url} type="video/mp4" />
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

export default Addproduct;
