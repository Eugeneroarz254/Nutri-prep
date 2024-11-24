import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getAEnquiry,
  resetState,
  submitFeedback,
  updateAEnquiry,
} from "../features/enquiry/enquirySlice";
import { BiArrowBack } from "react-icons/bi";
import * as yup from "yup";
import { useFormik } from "formik";

const contactSchema = yup.object({
  feedback: yup.string().default('').nullable().required("Feedback is Required."),
  name: yup.string().required("Staff Member Name is Required."), // Add validation for staff member name
});

const ViewEnq = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getEnqId = location.pathname.split("/")[3];
  const enqState = useSelector((state) => state.enquiry);
  const { enqName, enqMobile, enqEmail, enqComment, enqStatus } = enqState;

  useEffect(() => {
    dispatch(getAEnquiry(getEnqId));
  }, [getEnqId, dispatch]);

  const goBack = () => {
    navigate(-1);
  };

  const setEnquiryStatus = (e, i) => {
    const data = { id: i, enqData: e };
    dispatch(updateAEnquiry(data));
    dispatch(resetState());
    setTimeout(() => {
      dispatch(getAEnquiry(getEnqId));
    }, 100);
  };

  const formik = useFormik({
    initialValues: {
      feedback: "",
      name: "",
    },
    validationSchema: contactSchema,
    onSubmit: async (values, { resetForm }) => {
      const feedbackData = {
        id: getEnqId,
        email: enqEmail,
        originalComment: enqComment, // Include original comment
        feedback: values.feedback,
        staffMember: values.name,
        userName:enqName,
      };
      console.log("Data being sent to backend:", feedbackData);
      await dispatch(submitFeedback(feedbackData));
      resetForm(); // Reset the form fields after successful submission
    },
  });

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mb-4 title">View Enquiry</h3>
        <button
          className="bg-transparent border-0 fs-6 mb-0 d-flex align-items-center gap-1"
          onClick={goBack}
        >
          <BiArrowBack className="fs-5" /> Go Back
        </button>
      </div>
      <div className="view-enq-wrapper">
        <div className="view-enq-content">
          <div className="bg-white p-4 d-flex gap-3 flex-column rounded-3">
            <div className="d-flex align-items-center gap-3">
              <h6 className="mb-0">Name:</h6>
              <p className="mb-0">{enqName}</p>
            </div>
            <div className="d-flex align-items-center gap-3">
              <h6 className="mb-0">Mobile:</h6>
              <p className="mb-0">
                <a href={`tel:+91${enqMobile}`}>{enqMobile}</a>
              </p>
            </div>
            <div className="d-flex align-items-center gap-3">
              <h6 className="mb-0">Email:</h6>
              <p className="mb-0">
                <a href={`mailto:${enqEmail}`}>{enqEmail}</a>
              </p>
            </div>
            <div className="d-flex align-items-center gap-3">
              <h6 className="mb-0">Comment:</h6>
              <p className="mb-0">{enqComment}</p>
            </div>
            <div className="d-flex align-items-center gap-3">
              <h6 className="mb-0">Status:</h6>
              <p className="mb-0">{enqStatus}</p>
            </div>
            <div className="d-flex align-items-center gap-3">
              <h6 className="mb-0">Change Status:</h6>
              <div>
                <select
                  value={enqStatus || "Submitted"} // Use value instead of defaultValue
                  className="form-control form-select"
                  onChange={(e) => setEnquiryStatus(e.target.value, getEnqId)}
                >
                  <option value="Submitted">Submitted</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="p-3 view-enq-form">
          <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
            <div>
              <input
                type="text"
                className="form-control"
                placeholder="Staff Member Name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              <div className="errors">
                {formik.touched.name && formik.errors.name}
              </div>
            </div>
            <div className="mt-3">
              <textarea
                className="w-100 form-control"
                cols="30"
                rows="4"
                placeholder="Feedback"
                name="feedback"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.feedback}
              ></textarea>
              <div className="errors">
                {formik.touched.feedback && formik.errors.feedback}
              </div>
            </div>
            <div>
              <div className="enq-button-container">
                <button type="submit" className="button border-0">Send</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ViewEnq;
