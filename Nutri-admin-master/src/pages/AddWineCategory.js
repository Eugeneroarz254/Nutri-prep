import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
    createCategory,

  getWineCategory,
  resetState,
  updateWineCategory,
} from "../features/wcategory/wcategorySlice"; // Assuming you have a winecategorySlice

let schema = yup.object().shape({
  title: yup.string().required("Category Name is Required"),
});

const AddWineCategory = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getWineCatId = location.pathname.split("/")[3];
  const navigate = useNavigate();
  const newCategory = useSelector((state) => state.wCategory); // Assuming you have a wineCategory state
  const {
    isSuccess,
    isError,
    isLoading,
    createdCategory,
    categoryName,
    updatedCategory,
  } = newCategory;

  useEffect(() => {
    if (getWineCatId !== undefined) {
      dispatch(getWineCategory(getWineCatId));
    } else {
      dispatch(resetState());
    }
  }, [getWineCatId]);

  useEffect(() => {
    if (isSuccess && createdCategory) {
      toast.success("Category Added Successfully!");
    }
    if (isSuccess && updatedCategory) {
      toast.success("Category Updated Successfully!");
      navigate("/admin/list-wine-category");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getWineCatId !== undefined) {
        const data = { id: getWineCatId, wineCatData: values };
        dispatch(updateWineCategory(data));
        dispatch(resetState());
      } else {
        dispatch(createCategory(values));
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
        {getWineCatId !== undefined ? "Edit" : "Add"} Wine Category
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Wine Category"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            id="wine-category"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getWineCatId !== undefined ? "Edit" : "Add"} Wine Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddWineCategory;
