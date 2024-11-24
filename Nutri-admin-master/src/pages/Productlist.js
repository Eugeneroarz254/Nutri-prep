import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteAProduct, getProducts, resetState } from "../features/product/productSlice";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title:"Image",
    dataIndex:"images",
    render: (text) => <img src={text} alt="Product" style={{ width: 50 }} />,
    width: 80,

  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
    width: 300,
  },

  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },

  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Productlist = () => {
  const [open, setOpen] = useState(false);
  const [productId, setproductId] = useState("");
  const showModal = (id) => {
    setOpen(true);
    setproductId(id);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getProducts());
  }, []);
  const productState = useSelector((state) => state.product.products);
  console.log("product", productState)
  const data1 = [];
  for (let i = 0; i < productState.length; i++) {
    const imageUrl = productState[i].images[0]?.url;
  
    let priceToDisplay = 0; // Default to 0 in case there's no pricePerSize
  
    if (productState[i].pricePerSize && Array.isArray(productState[i].pricePerSize) && productState[i].pricePerSize.length > 0) {
      const minPriceSize = productState[i].pricePerSize.reduce((prev, current) => {
        return current.price < prev.price ? current : prev;
      });
      priceToDisplay = minPriceSize.price; // Set the minimum price as the display price
    }
  
    // Add the product data to the table
    data1.push({
      key: i + 1,
      images: imageUrl,
      title: productState[i].title,
      category: productState[i].category,
      price: `KES ${priceToDisplay.toLocaleString()}`, // Use the minimum size price here
      action: (
        <>
          <Link to={`/admin/product/${productState[i]._id}`} className="fs-3 text-danger">
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(productState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  
  
  const deleteProduct = (productId) => {
    dispatch(deleteAProduct(productId));

    setOpen(false);
    setTimeout(() => {
      dispatch(getProducts());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteProduct(productId);
        }}
        title="Are you sure you want to delete this product?"
      />
    </div>
  );
};


export default Productlist;
