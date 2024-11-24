import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  createCover,
  getACover,
  resetState,
  updateACover,
} from "../features/cover/coverSlice";
import { getCategories } from "../features/ccategory/ccategorySlice";

let schema = yup.object().shape({
  category: yup.string().required("Category is Required"),
});
const Addcover = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, []);

  const navigate = useNavigate();
  const location = useLocation();
  const getCoverId = location.pathname.split("/")[3];
 
  const imgState = useSelector((state) => state.upload.images);
  const cCatState = useSelector((state) => state.cCategory.cCategories);
  const newCover = useSelector((state) => state.cover);
  const {
    isSuccess,
    isError, 
    isLoading,
    createdCover,
    coverData,
    updatedCover
  } = newCover || {};

  useEffect(() => {
    if (getCoverId !== undefined) {
      dispatch(getACover(getCoverId));
    } else {
      dispatch(resetState());
    }
  }, [getCoverId]);

console.log("coverdata",coverData)
  useEffect(() => {
    if (isSuccess && createdCover) {
      toast.success("Cover Added Successfullly!");
    }
    if (isSuccess && updatedCover) {
      toast.success("Cover Updated Successfullly!");
      navigate("/admin/cover-list");
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
  console.log("image",img);
  useEffect(() => {
    formik.values.images = imgState;
  }, [imgState]);

  console.log("imgState:", imgState);


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      category: coverData ? coverData.category || "" : "",
      images: coverData ? coverData.images || [] : [],
      
    },

    validationSchema: schema,
    onSubmit: (values) => {
      console.log("values",values)
      if (getCoverId !== undefined) {
        const data = { id: getCoverId, coverData: values };
        dispatch(updateACover(data));
        dispatch(resetState());
      } else {
        dispatch(createCover(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getCoverId !== undefined ? "Edit" : "Add"} Cover
      </h3>

      <div className="">
        <form action="" onSubmit={formik.handleSubmit}>
   
          <select
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
            className="form-control py-3  mt-3"
            id=""
          >
            <option value="">Select Cover Category</option>
            {cCatState.map((i, j) => {
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

          <div className="bg-white border-1 p-5 text-center mt-3">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages d-flex flex-wrap mt-3 gap-3">
            {imgState?.map((i, j) => {
              return (
                <div className=" position-relative" key={j}>
                  <button
                    type="button"
                    onClick={() => dispatch(delImg(i.public_id))}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={i.url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>

          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getCoverId !== undefined ? "Edit" : "Add"} Cover
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcover;
