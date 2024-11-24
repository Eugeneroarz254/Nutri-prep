import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../components/CustomModal";
import { deleteAWineBrand,resetState, getWineBrands } from "../features/winebrands/winebrandSlice";

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


const Brandwinelist = () => {
    const [open, setOpen] = useState(false);
    const [brandId, setbrandId] = useState("");
    const showModal = (e) => {
      setOpen(true);
      setbrandId(e);
    };
  
    const hideModal = () => {
      setOpen(false);
    };
  
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(resetState());
      dispatch(getWineBrands());
    }, []);
  
    const brandState = useSelector((state) => state.winebrands.winebrands);
    const data1 = [];
    for (let i = 0; i < brandState.length; i++) {
      data1.push({
        key: i + 1,
        name: brandState[i].title,
        action: (
          <>
            <Link
              to={`/admin/winebrand/${brandState[i]._id}`}
              className=" fs-3 text-danger"
            >
              <BiEdit />
            </Link>
            
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModal(brandState[i]._id)}
            >
              <AiFillDelete />
            </button>
          </>
        ),
      });
    }
  
    const deleteWineBrand = (e) => {
      dispatch(deleteAWineBrand(e));
  
      setOpen(false);
      setTimeout(() => {
        dispatch(getWineBrands());
      }, 100);
    };
  
    return (
      <div>
        <h3 className="mb-4 title">Wine Brands</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={() => {
            deleteWineBrand(brandId);
          }}
          title="Are you sure you want to delete this wine brand?"
        />
      </div>
    );
  };
export default Brandwinelist