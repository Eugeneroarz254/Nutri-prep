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
import { Link, useNavigate } from "react-router-dom";
import Productcard2 from "../components/Productcard2";
import ReactPaginate from "react-paginate";
import { useMediaQuery } from "react-responsive";

const Sets= () => {
  const [grid, setGrid] = useState(4);
  const productsState = useSelector(state => state?.product?.product)
  const productState = useSelector(state => state?.product?.product)
  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])



  // Filter States
  const [tag, setTag] = useState(null)
  const [category, setCategory] = useState(null)
  const [brand, setBrand] = useState(null)
  const [minPrice,setMinPrice]=useState(null)
  const [maxPrice, setMaxPrice] = useState(null)
  const [sort,setSort]=useState(null)
  const isDesktop = useMediaQuery({ minWidth: 768 });



useEffect(() => {
  let newBrands = [];
  let category = []

  for (let index = 0; index < productState.length; index++) {
    const element = productState[index];
    if (element.type === 'jersey') {
      newBrands.push(element.brand);
      category.push(element.category);

    }
  }
  setCategories(category)
  setBrands(newBrands);
}, [productState]);


  const closeModal = () => { };
  const [popularProduct,setPopularProduct]=useState([])
  useEffect(() => {
    let data=[]
    for (let index = 0; index < productsState.length; index++) {
      const element = productsState[index];
      if (element.type === 'jersey') {
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

  return (
    <>
      <Meta title={"Office Chairs"} />
    
 
      <Container class1={`store-wrapper mt-3 spring  ${isDesktop ? "row px-5" : ""}`}>
        
        <div className="row  laptop-row ">
          <div className="col-3 shop-by">
            <div className="filter-card  mb-3">
              <h3 className="filter-title">Shop By Categories</h3>
              <div>
                <ul className="ps-0">
                  {
                    categories && [...new Set(categories)].map((item, index) => {
                      return <li key={index} onClick={() => setCategory(item)}>{item}</li>
                   })
                  }
                  
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
      

            <div className=" mb-3">
              <h3 className="sub-title">Product Brands</h3>
              <div>
                <div className="product-tags d-flex flex-wrap align-items-center gap-10">

                {
                    brands && [...new Set(brands)].map((item, index) => {
                      return  (<span onClick={()=>setBrand(item)} key={index} className="text-capitalize badge bg-light text-secondary rounded-3 py-2 px-3">
                     {item}
                    </span>)
                   })
                  }
                 
                 
                </div>
              </div>
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
     pageRangeDisplayed={5}
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

export default Sets;