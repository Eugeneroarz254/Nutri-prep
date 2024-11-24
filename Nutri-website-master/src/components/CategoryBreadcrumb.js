import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { GrFormNext } from "react-icons/gr";

const CategoryBreadcrumb = (props) => {
  const { title } = props; // This title is the category name, e.g., "Single Malt"

  // Get the product state from the Redux store
  const productState = useSelector((state) => state?.product?.product);



  // Fetch the product type for the given category title
  const productType = useMemo(() => {
    if (!productState) return "Product"; // If no product state, return a default value

    // Check if productState is an array of products or categories
    if (Array.isArray(productState)) {
      // Find the product whose category matches the title prop
      const matchingProduct = productState.find(
        (item) => item.category.toLowerCase() === title.toLowerCase()
      );
      // If found, return the product type, otherwise default to "Product"
      return matchingProduct?.type || "Product";
    }

    // If productState is a single product object and category matches the title
    if (productState.category?.toLowerCase() === title.toLowerCase()) {
      return productState.type || "Product";
    }

    return "Product";
  }, [productState, title]);


  const type = productType;

  
  const formattedType = type.toLowerCase().split(" ").join("-");


  const typeRoute = `/${formattedType}`;

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

              <Link to={typeRoute} className="text-dark">
                {type}&nbsp;
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

export default CategoryBreadcrumb;
