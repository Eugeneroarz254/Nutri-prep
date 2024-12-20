import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteACover, getCovers, resetState } from "../features/cover/coverSlice";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
    width:80,
  },
  {
    title:"Image",
    dataIndex:"images",
    render: (text) => <img src={text} alt="Cover" style={{ width: 50 }} />,
    width: 80,

  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Coverlist = () => {
  const [open, setOpen] = useState(false);
  const [coverId, setcoverId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setcoverId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCovers());
  }, []);

  const getCoverState = useSelector((state) => state.cover.covers);
  console.log("covers", getCoverState)

  const data1 = [];
  for (let i = 0; i < getCoverState.length; i++) {
    const imageUrl = getCoverState[i].images[0]?.url; 

    data1.push({
      key: i + 1,
      images: imageUrl,
      category: getCoverState[i].category,

      action: (
        <>
          <Link
            to={`/admin/cover/${getCoverState[i]._id}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(getCoverState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteCover = (e) => {
    dispatch(deleteACover(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getCovers());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Covers List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteCover(coverId);
        }}
        title="Are you sure you want to delete this blog?"
      />
    </div>
  );
};

export default Coverlist;