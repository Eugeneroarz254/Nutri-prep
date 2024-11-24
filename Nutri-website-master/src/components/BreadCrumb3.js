import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { GrFormNext } from "react-icons/gr";

const BreadCrumb3 = (props) => {
  const { title } = props;

  // Select the single product state from Redux
  const productState = useSelector((state) => state?.product?.singleproduct);

  // Get category name from productState or use a fallback
  const category = productState?.category || "Product"; // Fallback to "Product" if category is not available
  const formattedCategory = category.toLowerCase().split(" ").join("-"); // Format category string

  // Fetch the product type directly from the productState
  const productType = useMemo(() => {
    if (!productState) return "Product"; // If no product state, return a default value
    return productState.type || "Product"; // Fallback to "Product" if type is not available
  }, [productState]);

  // Use the found product type
  const type = productType;

  // Format the type string for the route
  const formattedType = type.toLowerCase().split(" ").join("-");

  // Construct the type route for the breadcrumb
  const typeRoute = `/${formattedType}`;

  return (
    <div className="breadcrumb mb-0 py-4 px-3">
      <div className="container-xxl">
        <div className="row">
          <div className="col-12">
            <span className="text-align-start mb-0">
              {/* Home link */}
              <Link to="/" className="text-dark">
                Home&nbsp;
              </Link>
              <span>
                <GrFormNext />&nbsp;
              </span>

              {/* Link to type route */}
              <Link to={typeRoute} className="text-dark">
                {type}&nbsp;
              </Link>
              <span>
                <GrFormNext />&nbsp;
              </span>

              {/* Link to category route using type and category */}
              <Link to={`${typeRoute}/category/${formattedCategory}`} className="text-dark">
                {category}&nbsp;
              </Link>
              <span>
                <GrFormNext />&nbsp;{title}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreadCrumb3;
