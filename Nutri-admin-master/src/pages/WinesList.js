import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import { deleteAWine, getWines, resetState } from "../features/wine/wineSlice";
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
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
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

const WinesList = () => {
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
    dispatch(getWines());
  }, []);
  const productState = useSelector((state) => state.wines.wines);
  console.log("product", productState)
  const data1 = [];
  for (let i = 0; i < productState.length; i++) {
    const product = productState[i];
    if (product.tags === 'Wines') {
      const imageUrl = product.images[0]?.url;

      data1.push({
        key: i + 1,
        images: imageUrl,
        title: product.title,
        brand: product.brand,
        category: product.category,
        price: `${product.price}`,
        action: (
          <>
            <Link to={`/admin/wines/${product._id}`} className=" fs-3 text-danger">
              <BiEdit />
            </Link>
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModal(product._id)}
            >
              <AiFillDelete />
            </button>
          </>
        ),
      });
    }
  }
  const deleteProduct = (productId) => {
    dispatch(deleteAWine(productId));

    setOpen(false);
    setTimeout(() => {
      dispatch(getWines());
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


export default WinesList;
