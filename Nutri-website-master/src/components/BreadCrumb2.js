import React from "react";
import { Link } from "react-router-dom";

const BreadCrumb2 = (props) => {
  const { title } = props;
  return (
    <div className="breadcrumb mb-0 mt-3">
      <div className="container-xxl">
        <div className="row">
          <div className="col-12">
            <p className="text-align-start mb-0">
              <Link to="/properties" className="text-dark">
                Back &nbsp;
              </Link>
              / {title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreadCrumb2;
