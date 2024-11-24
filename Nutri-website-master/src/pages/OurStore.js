import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ReactStars from "react-rating-stars-component";
import ProductCard from "../components/ProductCard";
import Color from "../components/Color";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/products/productSlice";
import { useLocation } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import { getAllWines } from "../features/wines/wineSlice";
import { useMediaQuery } from "react-responsive";
import SearchCard from "../components/SearchCard";

const OurStore = () => {
  const [grid, setGrid] = useState(4);
  const productState = useSelector((state) => state?.product?.product);
  const wineState = useSelector((state) => state?.wines?.wines);

  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])
  const isDesktop = useMediaQuery({ minWidth: 768 });

  // Filter States
  const [tag, setTag] = useState(null)
  const [category, setCategory] = useState(null)
  const [brand, setBrand] = useState(null)
  const [minPrice,setMinPrice]=useState(null)
  const [maxPrice, setMaxPrice] = useState(null)
  const [sort,setSort]=useState(null)

  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("search");

  const [filteredProducts, setFilteredProducts] = useState([]);




  const dispatch = useDispatch();
  useEffect(() => {
    getProducts();
  }, [sort, tag, brand, category, minPrice, maxPrice]);
  const getProducts = () => {
    dispatch(getAllProducts({ sort, tag, brand, category, minPrice, maxPrice }));
    dispatch(getAllWines({ sort, tag, brand, category, minPrice, maxPrice }));
  };

  useEffect(() => {
    if (searchQuery) {
      const productsMatchingSearch = productState.filter((product) => {
        const productTitle = product.title.toLowerCase();
        const productType = (product.type || "").toLowerCase();
        const productBrand = (product.brand || "").toLowerCase();
        const productCategory = (product.category || "").toLowerCase(); // Assuming category is a property of product object
      
        return (
          productTitle.includes(searchQuery.toLowerCase()) ||
          productType.includes(searchQuery.toLowerCase()) ||
          productBrand.includes(searchQuery.toLowerCase()) ||
          productCategory.includes(searchQuery.toLowerCase())
        );
      });
      

      const winesMatchingSearch = wineState.filter((wine) => {
        const wineTitle = wine.title.toLowerCase();
        const wineBrand = (wine.brand || "").toLowerCase();
        const wineCategory = (wine.category || "").toLowerCase(); 
        const wineType = (wine.type || "").toLowerCase(); 
      
        return (
          wineTitle.includes(searchQuery.toLowerCase()) ||
          wineBrand.includes(searchQuery.toLowerCase()) ||
          wineCategory.includes(searchQuery.toLowerCase()) ||
          wineType.includes(searchQuery.toLowerCase())
        );
      });
      

      const combinedResults = [...productsMatchingSearch, ...winesMatchingSearch];

      setFilteredProducts(combinedResults);
    } else {
      setFilteredProducts([...productState, ...wineState]);
    }
  }, [productState, wineState, searchQuery]);



  
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = Array.isArray(filteredProducts)
  ? filteredProducts.slice(startIndex, endIndex)
  : [];  


  
  useEffect(() => {
    let newCategories = new Set();
    
    for (let index = 0; index < productState.length; index++) {
      const element = productState[index];
      newCategories.add(element.category);
    }
  
    setCategories([...newCategories]); 

  }, [productState]);


  const [activeCategory, setActiveCategory] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null); // State to track hovered category

  const handleCategoryClick = (category) => {
    const formattedCategory = category.toLowerCase().split(" ").join("-");
    setActiveCategory(formattedCategory); // Set the active category
    window.location.href = `/${formattedCategory}`;
  };

  
  return (
    <>
      <Meta title={"Our Store"} />
      <BreadCrumb title="Our Store" />
      <Container class1="search-wrapper home-wrapper-2 py-5">
        <div className="row laptop-row">
          <div className="col-3">
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

          
   
          </div>
          <div className="col-9 search-container  position-relative">
            <div className="filter-sort-grid filter-container mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-10">
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
                    <option value="createdAt">Date, old to new</option>
                    <option value="-createdAt">Date, new to old</option>
                  </select>
                </div>
                <div className="d-flex products-count align-items-center gap-10">
                <p className="totalproducts mb-0">{filteredProducts.length} Products</p>
                  <div className="d-flex gap-10 align-items-center grid">
                    <img
                      onClick={() => {
                        setGrid(3);
                      }}
                      src="images/gr4.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />

  

                    <img
                      onClick={() => {
                        setGrid(12);
                      }}
                      src="images/gr.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="products-list   pb-5">
            {isDesktop ? (

            <div className={`d-grid ${grid === 12 ? 'd-flex' : ''} flex-wrap`}>
  {currentItems.map((product, index) => (
    <ProductCard key={index} data={product} grid={grid} />
  ))}
       </div>):(
         <div className="search-list">
         {currentItems.map((product, index) => (
           <SearchCard key={index} data={product}  />
         ))}
       </div>
)}

            </div>

        <div className="d-flex  paginate-container1 position-absolute">
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


          </div>
        </div>
      </Container>


    </>
  );
};

export default OurStore;
