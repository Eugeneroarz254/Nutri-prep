import React from "react";
import { Link } from "react-router-dom";
import { GrFormNext } from "react-icons/gr";

const ProfileBreadCrumb = (props) => {
  const { title } = props;
  return (
    <div className="breadcrumb mb-0 mt-3">
      <div className="container-xxl">
        <div className="row breadcrumb-row">
          <div className="col-12">
          <p className="text-align-start mb-0">
              <Link to="/" className="text-dark">
                Home&nbsp; 
              </Link>

              <Link to="/my-account" className="text-dark">
              <GrFormNext />&nbsp;My Account&nbsp;
              </Link>
              
              <GrFormNext />{title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBreadCrumb;
