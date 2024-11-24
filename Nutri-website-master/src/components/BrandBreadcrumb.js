import React from "react";
import { Link, useParams } from "react-router-dom";
import { GrFormNext } from "react-icons/gr";

// Utility function to capitalize each word in a string
const capitalizeWords = (str) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const BrandBreadcrumb = () => {
  const { type, brand } = useParams();

  // Format and capitalize type and brand for display
  const formattedType = type ? capitalizeWords(type.replace(/-/g, " ")) : "Product";
  const formattedBrand = brand ? capitalizeWords(brand.replace(/-/g, " ")) : "Category";

  // Construct the category route
  const categoryRoute = `/${type}`;

  return (
    <div className="breadcrumb mb-0 py-4 px-3">
      <div className="container-xxl">
        <div className="row">
          <div className="col-12">
            <span className="text-align-start mb-0">
              <Link to="/" className="text-dark">
                Home&nbsp;
              </Link>
              <span>
                <GrFormNext />&nbsp;
              </span>
              <Link to={categoryRoute} className="text-dark">
                {formattedType}&nbsp;
              </Link>
              <span>
                <GrFormNext />&nbsp;{formattedBrand}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandBreadcrumb;
