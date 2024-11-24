import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteSize, getSizes, resetState } from "../features/size/sizeSlice";
import CustomModal from "../components/CustomModal";


const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const SizeList = () => {
  const [open, setOpen] = useState(false);
  const [sizeId, setSizeId] = useState("");

  const showModal = (id) => {
    setOpen(true);
    setSizeId(id);
    console.log(id);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getSizes());
  }, []);

 

  const sizeState = useSelector((state) => state.size.sizes);
  console.log(sizeState);
  const data = sizeState.map((size, index) => {
    return{
    key: index + 1,
    name: size.title,
    action: (
      <>
        <Link to={`/admin/size/${size._id}`} className="fs-3 text-danger">
          <BiEdit />
        </Link>
        <button
          className="ms-3 fs-3 text-danger bg-transparent border-0"
          onClick={() => showModal(size._id)}
        >
          <AiFillDelete />
        </button>
      </>
    ),
  }});


  const deleteSizeItem = (id) => {
    dispatch(deleteSize(id));
    setOpen(false);
    setTimeout(() => {
      dispatch(getSizes());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Sizes</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => deleteSizeItem(sizeId)}
        title="Are you sure you want to delete this size?"
      />
    </div>
  );
};

export default SizeList;
