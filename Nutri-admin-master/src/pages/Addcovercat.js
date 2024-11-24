import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createNewCoverCat,
  getACoverCat,
  resetState,
  updateACoverCat,
} from "../features/ccategory/ccategorySlice";
let schema = yup.object().shape({
  title: yup.string().required("Category Name is Required"),
});
const Addcovercat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getCoverCatId = location.pathname.split("/")[3];
  const newCoverCategory = useSelector((state) => state.cCategory);
  const {
    isSuccess,
    isError,
    isLoading,
    createCoverCategory,
    coverCatName,
    updatedCoverCategory,
  } = newCoverCategory;
  useEffect(() => {
    if (getCoverCatId !== undefined) {
      dispatch(getACoverCat(getCoverCatId));
    } else {
      dispatch(resetState());
    }
  }, [getCoverCatId]);
  useEffect(() => {
    if (isSuccess && createCoverCategory) {
      toast.success("Cover Category Added Successfullly!");
    }
    if (isSuccess && updatedCoverCategory) {
      toast.success("Cover Category Updated Successfullly!");
      navigate("/admin/cover-category-list");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: coverCatName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const data = { id: getCoverCatId, coverCatData: values };
      if (getCoverCatId !== undefined) {
        dispatch(updateACoverCat(data));
        dispatch(resetState());
      } else {
        dispatch(createNewCoverCat(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4  title">
        {getCoverCatId !== undefined ? "Edit" : "Add"} Cover Category
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            label="Enter Cover Category"
            id="covercat"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getCoverCatId !== undefined ? "Edit" : "Add"} Cover Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcovercat;