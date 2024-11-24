import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getOrders, updateAOrder, markOrderAsViewed } from "../features/auth/authSlice";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "User Info",
    dataIndex: "shipping",
  },
  {
    title: "Product",
    dataIndex: "product",
  },

  {
    title: "Date",
    dataIndex: "date",
  },

  {
    title: "Shipping Info",
    dataIndex: "address",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const Orders = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const orderState = useSelector((state) => state?.auth?.orders?.orders);
  
  const handleViewOrderClick = (orderId) => {
    dispatch(markOrderAsViewed({ id: orderId }));
  };

  const data1 = orderState?.map((order, index) => ({
    key: index + 1,
    shipping: (
      <>
        <div>{order?.user?.firstname} {order?.user?.lastname}</div>
        <div>{order?.user?.email}</div>
      </>
    ),
    address: (
      <>
        <div>{order?.shippingInfo?.county}</div>
        <div>{order?.shippingInfo?.area}</div>
        <div>+254{order?.shippingInfo?.phoneNumber}</div>
        <div>+254{order?.shippingInfo?.additionalNumber}</div>
      </>
    ),
    product: (
      <Link 
        to={`/admin/order/${order?._id}`} 
        onClick={() => handleViewOrderClick(order?._id)}
      >
        View Orders
      </Link>
    ),
    date: (
      <>
        <div>{new Date(order?.createdAt).toLocaleDateString()}</div>
        <div>{new Date(order?.createdAt).toLocaleTimeString()}</div>
      </>
    ),
    action: (
      <>
        <select
          defaultValue={order?.orderStatus}
          onChange={(e) => updateOrderStatus(order?._id, e.target.value)}
          className="form-control form-select"
        >
          <option value="Ordered" disabled selected>Ordered</option>
          <option value="Processed">Processed</option>
          <option value="Shipped">Shipped</option>
          <option value="Out For Delivery">Out For Delivery</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled Order</option>

        </select>
      </>
    ),
    className: order?.viewed ? '' : 'unviewed-row', // Add custom class based on viewed status
  }));
  
  const updateOrderStatus = (id, status) => {
    dispatch(updateAOrder({ id, status }));
  };

  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div>
        <Table 
          columns={columns} 
          dataSource={data1} 
          rowClassName={(record) => record.className}
        />
      </div>
    </div>
  );
  
};

export default Orders;

