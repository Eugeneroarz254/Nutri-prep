import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiPhoneCall, BiInfoCircle } from "react-icons/bi";
import Container from "../components/Container";
import * as yup from 'yup'
import { useFormik } from 'formik' 
import { useDispatch } from 'react-redux'
import { createQuery } from "../features/contact/contactSlice";
import ProfileBreadCrumb from "../components/ProfileBreadCrumb";

const contactSchema = yup.object({
  name: yup.string().required("Name is Required"),
  email: yup.string().nullable().email("Email should be valid.").required("Email is Required"),
  mobile: yup.string().default('').nullable().required("Mobile Number is Required."),
  comment: yup.string().default('').nullable().required("Comment is Required."),
});

const Contact = () => {
  const dispatch = useDispatch();
  
  const formik = useFormik({
    initialValues: {
      name: '',
      mobile: '',
      email: '',
      comment: ""
    },
    validationSchema: contactSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(createQuery({
        name: values.name,
        email: values.email,
        mobile: values.mobile,
        comment: values.comment
      }));
      resetForm(); // Reset the form fields after successful submission
    },
  });
  
  return (
    <>
    <Meta 
      title="Contact Us - Best Sellers Shop"
      description="Get in touch with The Best Sellers Shop for inquiries, support, or feedback. We're here to assist with all your office furniture needs."
      keywords="contact, customer support, inquiries, office furniture store, Best Sellers Shop"
      canonical="https://www.bestsellersshopke.com/contact"
    />
      <ProfileBreadCrumb title="Contact Us" />
      <Container class1="contact-wrapper mt-3 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8264738536254!2d36.8262894097326!3d-1.2775923356096026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f16d48adb4221%3A0xce2801a641e4c63d!2sTHE%20BEST%20SELLERS%20SHOP!5e0!3m2!1sen!2ske!4v1725691444532!5m2!1sen!2ske"
              width="600"
              height="450"
              className="border-0 w-100"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="col-12 mt-5">
            <div className="contact-inner-wrapper d-flex justify-content-between ">
              <div>
                <h3 className="contact-title mb-4">Contact</h3>
                <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      name="name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                    />
                    <div className="errors">
                      {formik.touched.name && formik.errors.name}
                    </div>
                  </div>
                  <div>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      name="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    <div className="errors">
                      {formik.touched.email && formik.errors.email}
                    </div>
                  </div>
                  <div>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Mobile Number"
                      name="mobile"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.mobile}
                    />
                    <div className="errors">
                      {formik.touched.mobile && formik.errors.mobile}
                    </div>
                  </div>
                  <div>
                    <textarea
                      id=""
                      className="w-100 form-control"
                      cols="30"
                      rows="4"
                      placeholder="Comments"
                      name="comment"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.comment}
                    ></textarea>
                    <div className="errors">
                      {formik.touched.comment && formik.errors.comment}
                    </div>
                  </div>
                  <div>
                    <button className="button border-0">Submit</button>
                  </div>
                </form>
              </div>
              <div>
                <h3 className="contact-title mb-4">Get in touch with us</h3>
                <div>
                  <ul className="ps-0">
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <AiOutlineHome className="fs-5" />
                      <address className="mb-0">
                        Ngara Rd, 00600<br/> Nairobi, Kenya
                      </address>
                    </li>
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <BiPhoneCall className="fs-5" />
                      <a href="tel:+254 113 886 482">  +254 113 886 482</a>
                    </li>
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <AiOutlineMail className="fs-5" />
                      <a href="mailto:electrocity@gmail.com">
                      bestsellersshopke@gmail.com
                      </a>
                    </li>
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <BiInfoCircle className="fs-5" />
                      <p className="mb-0">Monday – Saturday 10 AM – 8 PM</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Contact;
