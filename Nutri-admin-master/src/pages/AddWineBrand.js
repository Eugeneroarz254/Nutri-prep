import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createWineBrand,
  getAWineBrand,
  resetState,
  updateAWineBrand,
} from "../features/winebrands/winebrandSlice";

let schema = yup.object().shape({
  title: yup.string().required("Brand Name is Required"),
});

const AddWineBrand = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getBrandId = location.pathname.split("/")[3];
 console.log("id",getBrandId)
  const newBrand = useSelector((state) => state.winebrands);
  const {
    isSuccess,
    isError,
    isLoading,
    createdWineBrand,
    wineBrandName,
    updatedWineBrand,
  } = newBrand;

  useEffect(() => {
    if (getBrandId !== undefined) {
      dispatch(getAWineBrand(getBrandId));
    } else {
      dispatch(resetState());
    }
  }, [getBrandId]);

  useEffect(() => {
    if (isSuccess && createdWineBrand) {
      toast.success("Wine Brand Added Successfully!");
    }
    if (isSuccess && updatedWineBrand) {
      toast.success("Wine Brand Updated Successfully!");
      navigate("/admin/wine-brandlist");
    }

    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: wineBrandName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log("values",values)
      if (getBrandId !== undefined) {
        const data = { id: getBrandId, winebrandData: values };
        dispatch(updateAWineBrand(data));
        dispatch(resetState());
      } else {
        dispatch(createWineBrand(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 1000);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getBrandId !== undefined ? "Edit" : "Add"} Wine Brand
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            label="Enter Wine Brand"
            id="wineBrand"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getBrandId !== undefined ? "Edit" : "Add"} Wine Brand
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddWineBrand;
