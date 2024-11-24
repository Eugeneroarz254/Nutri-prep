import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { getOrder } from "../features/auth/authSlice";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Image",
    dataIndex: "image",
    render: (text) => <img src={text} alt="Product" style={{ width: 50 }} />,
  },
  {
    title: "Product Name",
    dataIndex: "name",
  },

  {
    title: "Category",
    dataIndex: "category",
  },

  {
    title: "Count",
    dataIndex: "count",
  },

  {
    title: "price",
    dataIndex: "amount",
  },
  {
    title: "Total Amount",
    dataIndex: "totalAmount",
  },
  
 

  
];

const ViewOrder = () => {
  const location = useLocation();
  const orderId = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrder(orderId));
  }, []);
  const orderState = useSelector((state) => state?.auth?.singleorder?.orders);
  console.log(orderState,"order");
 const data1 = [];
  for (let i = 0; i < orderState?.orderItems?.length; i++) {
    const orderItem = orderState?.orderItems[i];
    const product = orderItem?.product;
console.log(orderItem)
    data1.push({
      key: i + 1,
      image: orderState?.orderItems[i]?.product?.images[0]?.url,
      name: orderState?.orderItems[i]?.product?.title,
      category: orderState?.orderItems[i]?.product?.category,
      count: orderState?.orderItems[i]?.quantity,
      amount:`KES ${orderState?.orderItems[i]?.price.toLocaleString()}`,
      totalAmount:`KES ${orderState?.totalPriceAfterDiscount.toLocaleString()}`,
    });
  }
  console.log(data1);
  return (
    <div>
      <h3 className="mb-4 title">View Order</h3>
      <div>
        <Table columns={columns} dataSource={data1} /> 
      </div>
    </div>
  );
};

export default ViewOrder;
