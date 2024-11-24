import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteAProperty, getProperties } from "../features/property/propertySlice"; // Assuming you have similar action types and reducer logic for properties
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
    render: (text) => <img src={text} alt="Property" style={{ width: 50 }} />,

  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },

 
  {
    title:"Agent Name",
    dataIndex:"firstName"
  },

  {
    title:"Property Ref",
    dataIndex:"propertyRef"
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

const PropertyList = () => {
  const [open, setOpen] = useState(false);
  const [propertyId, setPropertyId] = useState("");
  
  const showModal = (e) => {
    setOpen(true);
    setPropertyId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getProperties()); // Change to getProperties action
  }, []);
  
  const propertyState = useSelector((state) => state.property.properties); // Change to property.properties
  const data1 = [];
  
  for (let i = 0; i < propertyState.length; i++) { // Change to propertyState
    data1.push({
      key: i + 1,
      images:propertyState[i].images[0].url,
      title: propertyState[i].title,
      propertyRef:propertyState[i].propertyRef,
      firstName:propertyState[i].firstName,
      phoneNumber:propertyState[i].phoneNumber,
      price: `${propertyState[i].price}`,
      action: (
        <>
          <Link to={`/admin/property/${propertyState[i]._id}`} className=" fs-3 text-danger">
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(propertyState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  
  const deleteProperty = (e) => {
    dispatch(deleteAProperty(e)); // Change to deleteAProperty action

    setOpen(false);
    setTimeout(() => {
      dispatch(getProperties()); // Change to getProperties action
    }, 100);
  };
  
  return (
    <div>
      <h3 className="mb-4 title">Properties</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteProperty(propertyId);
        }}
        title="Are you sure you want to delete this property?"
      />
    </div>
  );
};

export default PropertyList;
