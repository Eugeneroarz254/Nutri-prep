
import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import {  getAllProducts } from "../features/products/productSlice";
import { Link, useParams,  } from "react-router-dom";
  import { useMediaQuery } from "react-responsive";
 import BlendedScotchWhisky from "../components/BlendedScotch";

const TypePage= () => {
  
  const productState = useSelector(state => state?.product?.product)
  
  const [categories, setCategories] = useState([])
 

  // Filter States
  const [tag, setTag] = useState(null)
  const [category, setCategory] = useState(null)
  const [brand, setBrand] = useState(null)
  const [minPrice,setMinPrice]=useState(null)
  const [maxPrice, setMaxPrice] = useState(null)
  const [sort,setSort]=useState(null)
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const productsState = useSelector(state => state?.product?.product)

  const [popularProduct, setPopularProduct] = useState([]);

  const { type: typeFromUrl } = useParams();

  const formatTypeName = (type) => {
    if (!type) return ''; // Handle null or undefined case
    return type
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formattedType = formatTypeName(typeFromUrl);




  useEffect(() => {
    let data = [];
    for (let index = 0; index < productsState.length; index++) {
      const element = productsState[index];
      if (element.category === formattedType) {  
        data.push(element);
      }
    }
    setPopularProduct(data);
  }, [productsState, formattedType]);


  useEffect(() => {
    let newCategories = new Set();

    for (let index = 0; index < productState.length; index++) {
      const element = productState[index];
      
      if (element.type === formattedType) {
        newCategories.add(element.category);
      }
    }
    
    setCategories([...newCategories]);
  }, [productState, formattedType]);
  
  const dispatch = useDispatch();

  // Fetch products based on filters
  useEffect(() => {
    getProducts();
  }, [sort, tag, brand, category, minPrice, maxPrice]);

  const getProducts = () => {
    dispatch(getAllProducts({ sort, tag, brand, category, minPrice, maxPrice }));
  };


  return (
    <>
     <Meta 
    title={`${formattedType} - Synergy Vines`}
    description="Discover amazing discounts on top products at Best Sellers Shop. Shop today to find the best deals and save big on your favorite items."
    keywords="today's deals, discounts, sales, Best Sellers Shop, special offers, savings"
    canonical="https://www.bestsellersshopke.com/todays-deals"
      />

    
      <BreadCrumb title={formattedType}/>
      <Container class1={`store-wrapper  spring  ${isDesktop ? "row px-5" : ""}`}>
         <div className="row">
         <h2 className="type-header">{` ${formattedType} Brands in Kenya`}</h2>
         </div>
        

 
        <div className="row  categories-wrapper-element ">
    
        {categories.map((category, index) => {
  const formattedTitle = category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

    const categoryPath = `/${typeFromUrl}/category/${category.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="sub-category-container" key={index}>
      <div className="categories-header">
        <h2>{formattedTitle}</h2>  
        <Link to={categoryPath} className="view-all-btn">
          <span>View All</span>
        </Link>
      </div>

      <div>
        <BlendedScotchWhisky category={formattedTitle} />
      </div>
    </div>
  );
})}

         


          
        </div>
      </Container>
    </>
  );
};

export default TypePage;