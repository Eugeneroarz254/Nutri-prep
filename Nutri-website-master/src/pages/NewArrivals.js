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

const NewArrivals= () => {
  const [grid, setGrid] = useState(4);
  const productsState = useSelector(state => state?.product?.product)
  const productState = useSelector(state => state?.product?.product)
  

  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])
  const [materials, setMaterials] = useState([])



  // Filter States
  const [tag, setTag] = useState(null)
  const [category, setCategory] = useState(null)
  const [brand, setBrand] = useState(null)
  const [minPrice,setMinPrice]=useState(null)
  const [maxPrice, setMaxPrice] = useState(null)
  const [sort,setSort]=useState(null)
  const isDesktop = useMediaQuery({ minWidth: 768 });


  useEffect(() => {
    let newCategories = new Set();
    let newMaterials = new Set(); 
    
    for (let index = 0; index < productState.length; index++) {
      const element = productState[index];
      newCategories.add(element.category);
      newMaterials.add(element.material);
    }
  
    setCategories([...newCategories]); 
    setMaterials([...newMaterials]); 

  }, [productState]);
  

  const closeModal = () => { };
  const [popularProduct,setPopularProduct]=useState([])
  useEffect(() => {
    let data=[]
    for (let index = 0; index < productsState.length; index++) {
      const element = productsState[index];
      if (element.tags === 'New Arrivals') {
        data.push(element)
      }
      setPopularProduct(data)
      
    }
  }, [productState]) 

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;

  useEffect(() => {
    getProducts();
  }, [sort,tag,brand,category,minPrice,maxPrice]);
  const getProducts = () => {
    dispatch(getAllProducts({sort,tag,brand,category,minPrice,maxPrice}));
  };

  const pageCount = Math.ceil(popularProduct.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;

  const handlePageChange = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  const currentProducts = popularProduct.slice(offset, offset + itemsPerPage);

  const [activeCategory, setActiveCategory] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null); // State to track hovered category
  const [hoveredMaterial, setHoveredMaterial] = useState(null);

  const handleCategoryClick = (category) => {
    const formattedCategory = category.toLowerCase().split(" ").join("-");
    setActiveCategory(formattedCategory); // Set the active category
    window.location.href = `/${formattedCategory}`;
  };

  const handleMaterialClick = (material) => {
    const formattedMaterial = material.toLowerCase().split(" ").join("-");
    window.location.href = `/materials?material=${formattedMaterial}`;
  };

  const location = useLocation();


  const [showFilter, setShowFilter] = useState(false); 

  const [tempMinPrice, setTempMinPrice] = useState(minPrice || "");
const [tempMaxPrice, setTempMaxPrice] = useState(maxPrice || "");

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
    document.body.style.overflow = "auto"; 
  };
  

  const applyFilters = () => {
    setMinPrice(tempMinPrice);
    setMaxPrice(tempMaxPrice);
    setShowFilter(false);
    document.body.style.overflow = "auto"; 
  
    dispatch(getAllProducts({ minPrice: tempMinPrice, maxPrice: tempMaxPrice,  }));
  };
  
  
  const resetFilters = () => {
    setTempMinPrice("");
    setTempMaxPrice("");
    setMinPrice(null);
    setMaxPrice(null);
    setTag(null);
    setCategory(null);
    
    getProducts();
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
        <div className="filter-card mb-3">
          <h3 className="filter-title">Filter By Materials</h3>
          <div>
            <ul className="ps-0">
              {materials.map((item, index) => {
                const formattedMaterial = item.toLowerCase().split(" ").join("-");
                const isActive = location.pathname.includes(formattedMaterial);
  
                return (
                  <li
                    key={index}
                    onClick={() => handleMaterialClick(item)}
                    onMouseEnter={() => setHoveredMaterial(formattedMaterial)}
                    onMouseLeave={() => setHoveredMaterial(null)}
                    style={{
                      color:
                        isActive || hoveredMaterial === formattedMaterial
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
        <div className="filter-btn-container">
          <button onClick={resetFilters}>RESET</button>
          <button onClick={applyFilters}>SHOW</button>
        </div>
      </div>
    );
  };

  return (
    <>
    <Meta 
      title="New Arrivals - Best Sellers Shop"
      description="Explore the latest additions to our collection at The Best Sellers Shop. Discover new office furniture and accessories designed for style and functionality."
      keywords="new arrivals, office furniture, latest products, modern furniture, new collections"
      canonical="https://www.bestsellersshopke.com/new-arrivals"
    />
    
      <BreadCrumb title={"New Arrivals"}/>
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
              <h3 className="filter-title">Filter By Materials</h3>
              <div>
              <ul className="ps-0">
      {materials.map((item, index) => {
        const formattedMaterial = item.toLowerCase().split(" ").join("-");
        const isActive = location.pathname.includes(formattedMaterial);

        return (
          <li
            key={index}
            onClick={() => handleMaterialClick(item)}
            onMouseEnter={() => setHoveredMaterial(formattedMaterial)}
            onMouseLeave={() => setHoveredMaterial(null)}
            style={{
              color:
                isActive || hoveredMaterial === formattedMaterial
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

export default NewArrivals;