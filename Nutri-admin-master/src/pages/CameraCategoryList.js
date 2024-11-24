import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteCameraCategory,
  getCategories,
  resetState,
} from "../features/cameracategory/cameracategorySlice"; // Update the import path to match your actual file structure
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

const CameraCategoryList = () => {
  const [open, setOpen] = useState(false);
  const [cameraCatId, setCameraCatId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setCameraCatId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, []);

  const cameraCatStat = useSelector((state) => state.cCategories.cCategories); // Update the selector path to match your actual file structure
  console.log("values", cameraCatStat);

  const data1 = [];
  for (let i = 0; i < cameraCatStat.length; i++) {
    data1.push({
      key: i + 1,
      name: cameraCatStat[i].title,
      action: (
        <>
          <Link
            to={`/admin/cameracategory/${cameraCatStat[i]._id}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(cameraCatStat[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteCategory = (e) => {
    dispatch(deleteCameraCategory(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCategories());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Camera Categories</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteCategory(cameraCatId);
        }}
        title="Are you sure you want to delete this Camera Category?"
      />
    </div>
  );
};

export default CameraCategoryList;
