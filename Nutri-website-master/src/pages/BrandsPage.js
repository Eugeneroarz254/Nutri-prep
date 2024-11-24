import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ReactStars from "react-rating-stars-component";
import ProductCard from "../components/ProductCard";
import Color from "../components/Color";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getAProduct, getAllProducts } from "../features/products/productSlice";
import { Typeahead } from "react-bootstrap-typeahead";
import {BsSearch} from "react-icons/bs"
import { Link, useLocation, useNavigate } from "react-router-dom";
import Productcard2 from "../components/Productcard2";
import ReactPaginate from "react-paginate";
import { useMediaQuery } from "react-responsive";
import { IoFilter } from "react-icons/io5";
import { MdKeyboardBackspace } from "react-icons/md";
import { useParams } from 'react-router-dom';
import BrandBreadcrumb from "../components/BrandBreadcrumb";

const BrandsPage= () => {
  const [grid, setGrid] = useState(4);
  const productsState = useSelector(state => state?.product?.product)
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
  const [showFilter, setShowFilter] = useState(false); 
  const [brands, setBrands] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    let newCategories = new Set();
    let newBrands = new Set();
    for (let index = 0; index < productState.length; index++) {
      const element = productState[index];
      newBrands.add(element.brand)
      newCategories.add(element.category);
     
    }
  
    setCategories([...newCategories]); 
  
    setBrands([...newBrands])
  }, [productState]);
  

const [popularProduct, setPopularProduct] = useState([]);

const formatBrandName = (brand) => {
    if (!brand) return ''; // Handle null or undefined case
    return brand
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  const {type, brand: brandFromUrl } = useParams(); // Extract category from URL
  
  // Format the category name
  const formattedType = formatBrandName(type);

  const formattedBrand = formatBrandName(brandFromUrl);


useEffect(() => {
  let data = [];
  const formattedBrand = formatBrandName(brandFromUrl); // Format the brand name
  
  for (let index = 0; index < productsState.length; index++) {
    const element = productsState[index];
    if (element.brand === formattedBrand && element.type === formattedType) {  // Use the formatted brand for filtering
      data.push(element);
    }
  }

  setPopularProduct(data);
}, [productsState, brandFromUrl]);

const dispatch = useDispatch();
const [currentPage, setCurrentPage] = useState(0);
const itemsPerPage = 12;

useEffect(() => {
  getProducts();
}, [sort, tag, formattedBrand, category, minPrice, maxPrice]);

const getProducts = () => {
  dispatch(getAllProducts({ sort, tag, category, brand: formattedBrand, minPrice, maxPrice }));
};


  const pageCount = Math.ceil(popularProduct.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;

  const handlePageChange = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  const currentProducts = popularProduct.slice(offset, offset + itemsPerPage);

  const [activeCategory, setActiveCategory] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null); 
  const [activeBrand, setActiveBrand] = useState(null);

  const handleCategoryClick = (category) => {
    const formattedCategory = category.toLowerCase().split(" ").join("-");
    setActiveCategory(formattedCategory); 
    window.location.href =  `/${type}/category/${formattedCategory}`;
  };




  const location = useLocation();


  const [tempMinPrice, setTempMinPrice] = useState(minPrice || "");
const [tempMaxPrice, setTempMaxPrice] = useState(maxPrice || "");

// Temporary state to hold input values
const handleMinPriceChange = (e) => {
  setTempMinPrice(e.target.value);
};

const handleMaxPriceChange = (e) => {
  setTempMaxPrice(e.target.value);
};



  const toggleFilter = () => {
    setShowFilter(prev => {
      const newShowFilter = !prev;
      document.body.style.overflow = newShowFilter ? "hidden" : "auto";
      return newShowFilter;
    });
  };

  
  const handleBackButtonClick = () => {
    setShowFilter(false);
    document.body.style.overflow = "auto"; // Reset overflow to auto when filter is closed
  };
  

  const applyFilters = () => {
    setMinPrice(tempMinPrice);
    setMaxPrice(tempMaxPrice);
    setShowFilter(false);
    document.body.style.overflow = "auto"; // Reset overflow to auto when filter is closed
  
    dispatch(getAllProducts({ minPrice: tempMinPrice, maxPrice: tempMaxPrice, /* other filters */ }));
  };
  
  
  const resetFilters = () => {
    setTempMinPrice("");
    setTempMaxPrice("");
    setMinPrice(null);
    setMaxPrice(null);
    setTag(null);
    setCategory(null);
    
    getProducts(); // or dispatch an action to reset the products
  };
  
  const renderFilter = () => {
    return (
      <div className="col-14 shop-by-media">
        <div className="filter-back-btn-wrapper">
          <Link 
            className="filter-btn-container1"
            onClick={handleBackButtonClick}>
            <MdKeyboardBackspace className="filter-back-icon" />
            <h1>Filter</h1>
          </Link>
        </div>
        <div className="filter-card mb-3">
          <h3 className="filter-title">Shop By Categories</h3>
          <div>
            <ul className="ps-0">
              {categories.map((item, index) => {
                const formattedCategory = item.toLowerCase().split(" ").join("-");
                const isActive = location.pathname.includes(formattedCategory);
  
                return (
                  <li
                    key={index}
                    onClick={() => handleCategoryClick(item)}
                    onMouseEnter={() => setHoveredCategory(formattedCategory)}
                    onMouseLeave={() => setHoveredCategory(null)}
                    style={{
                      color:
                        isActive || hoveredCategory === formattedCategory
                          ? "#febd69"
                          : "inherit",
                      cursor: "pointer",
                      transition: "color 0.3s",
                    }}
                  >
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="filter-card mb-3">
          <h3 className="filter-title">Filter By</h3>
          <div>
            <h5 className="sub-title">Price</h5>
            <div className="d-flex align-items-center gap-10">
              <div className="form-floating">
              <input
                type="number"
                className="form-control"
                id="floatingInput"
                placeholder="From"
                value={tempMinPrice}
                onChange={handleMinPriceChange}
              />

                <label htmlFor="floatingInput">From</label>
              </div>
              <div className="form-floating">
              <input
                type="number"
                className="form-control"
                id="floatingInput1"
                placeholder="To"
                value={tempMaxPrice}
                onChange={handleMaxPriceChange}
              />
                <label htmlFor="floatingInput1">To</label>
              </div>
            </div>
          </div>
        </div>

        <div className="filter-btn-container">
          <button onClick={resetFilters}>RESET</button>
          <button onClick={applyFilters}>SHOW</button>
        </div>
      </div>
    );
  };
  
  const handleBrandClick = (brand) => {
    const formattedBrand = brand.toLowerCase().split(" ").join("-");
    setActiveBrand(formattedBrand); 
    window.location.href = `/${type}/brand/${formattedBrand}`;
  };



  return (
    <>
     <Meta 
      title={`${formattedBrand} - Synergy Views`}
      description="Browse our elegant and functional reception desks at The Best Sellers Shop. Perfect for creating a professional and welcoming entrance to your office."
      keywords="reception desk, office furniture, reception area, stylish desks, welcoming furniture"
      canonical="https://www.bestsellersshopke.com/reception-desk"
    />

    
     <BrandBreadcrumb title={formattedBrand} />
      <Container class1={`store-wrapper  spring  ${isDesktop ? "row px-5" : ""}`}>
      
        <div className="row position-relative  laptop-row ">
        <div className="col-3 shop-by">
            <div className="filter-card  mb-3">
              <h3 className="filter-title">Shop By Categories</h3>
              <div>
              <ul className="ps-0">
      {categories.map((item, index) => {
        const formattedCategory = item.toLowerCase().split(" ").join("-");
        const isActive = location.pathname.includes(formattedCategory);

        return (
          <li
            key={index}
            onClick={() => handleCategoryClick(item)}
            onMouseEnter={() => setHoveredCategory(formattedCategory)} // Set hovered category
            onMouseLeave={() => setHoveredCategory(null)} // Reset hovered category
            style={{
              color:
                isActive || hoveredCategory === formattedCategory
                  ? "#febd69" // Apply hover color or active color
                  : "inherit",
              cursor: "pointer",
              transition: "color 0.3s", // Smooth transition effect
            }}
          >
            {item}
          </li>
        );
      })}
    </ul>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Filter By</h3>
              <div>
              
                <h5 className="sub-title">Price</h5>
                <div className="d-flex align-items-center gap-10">
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput"
                      placeholder="From"
                      onChange={(e)=>setMinPrice(e.target.value)}
                    />
                    <label htmlFor="floatingInput">From</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput1"
                      placeholder="To"
                      onChange={(e)=>setMaxPrice(e.target.value)}
                    />
                    <label htmlFor="floatingInput1">To</label>
                  </div>
                </div>
              
                
              </div>
      

            </div>
            <div className="filter-card  mb-3">
              <h3 className="filter-title">Shop By Brand</h3>
              <div className="product-tags d-flex flex-wrap align-items-center gap-10">
              {brands.map((item, index) => (
                <span
                key={index}
                onClick={() => handleBrandClick(item)}
                className={`text-capitalize badge bg-light text-secondary rounded-3 py-2 px-3`}
                >
                {item}
                </span>
            ))}
            </div>
            </div>
          
   
          </div>

         

          <div className="col-9 the-col position-relative">
            <div className="filter-sort-grid filter-container justify-content-between d-flex sort-by mb-4">
              <div className="d-flex  justify-content-between align-items-center">
                <div className="d-flex  align-items-center gap-10">
                  <p className="mb-0 d-block" style={{ width: "100px" }}>
                    Sort By:
                  </p>
                  <select
                    name=""
                    defaultValue={"manula"}
                    className="form-control form-select"
                    id=""
                    onChange={(e)=>setSort(e.target.value)}
                  >
                    <option value="title">Alphabetically, A-Z</option>
                    <option value="-title">
                      Alphabetically, Z-A
                    </option>
                    <option value="price">Price, low to high</option>
                    <option value="-price">Price, high to low</option>
                  </select>
                </div>
     
              </div>
              {!isDesktop && (
              <div className="filter-wrapper">
            <button onClick={toggleFilter}>
               <IoFilter className="filter-icon"/>
            </button>
          </div>
           )}
    
            </div>

            <div className="products-list pb-5">
              <div className="d-grid laptop-store flex-wrap">
                <Productcard2
                data={currentProducts}
                  grid={grid}
                />
              </div>
            </div>

            <div className="d-flex  paginate-container-s position-absolute">
     <div>
     <ReactPaginate
     breakLabel="..."
     nextLabel=" >"
     onPageChange={handlePageChange}
     pageRangeDisplayed={3}
     pageCount={pageCount}
     previousLabel="< "
     renderOnZeroPageCount={null}
     containerClassName="pagination1"
     pageLinkClassName="page-num"
     previousLinkClassName="page-num"
     nextLinkClassName="page-num"
     activeLinkClassName="active"
   />
   </div>
     </div>

          {showFilter && renderFilter()} 
          </div>
        </div>
      </Container>
    </>
  );
};

export default BrandsPage;