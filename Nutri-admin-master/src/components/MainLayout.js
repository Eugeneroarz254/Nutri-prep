import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineBgColors,AiOutlineLogout
} from "react-icons/ai";
import { RiCouponLine } from "react-icons/ri";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { ImBlog } from "react-icons/im";
import { IoIosNotifications } from "react-icons/io";
import { FaClipboardList, FaBloggerB } from "react-icons/fa";

import {BsImages } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
import {RiImageAddFill} from "react-icons/ri";
import { SiBrandfolder } from "react-icons/si";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { getUnreadOrders } from "../features/auth/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/Images/crop-x.png"

const { Header, Sider, Content } = Layout;


const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch unread orders count from the Redux store
  const unreadOrdersCount = useSelector(state => state?.auth?.unreadorders);
  console.log(unreadOrdersCount?.length ?? 0, "count");
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const config3 = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};

{useEffect(() => {
  if (localStorage.getItem("count") !== "1") {
    localStorage.setItem("count", "1");
    window.location.reload();
  } else {
    const intervalId = setInterval(() => {
      dispatch(getUnreadOrders(config3));
    }, 1000); 

    
    return () => clearInterval(intervalId);
  }
}, [dispatch, config3]);}

  

  const handleNotificationsClick = () => {
    navigate("/admin/orders");
  };


  
  return (
    <Layout /* onContextMenu={(e) => e.preventDefault()} */>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-logo">S.V</span>
            <span className="lg-logo">Synergy Vines</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "signout") {
              localStorage.clear()
              window.location.reload()
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "customers",
              icon: <AiOutlineUser className="fs-4" />,
              label: "Customers",
            },
            {
              key: "Catalog",
              icon: <AiOutlineShoppingCart className="fs-4" />,
              label: "Catalog",
              children: [
                {
                  key: "product",
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: "Add Product",
                },
                {
                  key: "list-product",
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: "Product List",
                },
                {
                  key: "brand",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Brand",
                },
                {
                  key: "list-brand",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Brand List ",
                },


 
                {
                  key: "category",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Category",
                },
                {
                  key: "list-category",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Category List",
                },

                {
                  key: "size",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Size",
                },
                {
                  key: "size-list",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Size List ",
                },
    

              ],
            },
            {
              key: "orders",
              icon: <FaClipboardList className="fs-4" />,
              label: "Orders",
            },
      
  
            {
              key: "covers",
              icon: <BsImages className="fs-4" />,
              label: "Covers",
              children: [
                {
                  key: "cover",
                  icon: <RiImageAddFill className="fs-4" />,
                  label: "Add Cover",
                },
                {
                  key: "cover-list",
                  icon: <BsImages className="fs-4" />,
                  label: "Cover List",
                },
                {
                  key: "cover-category",
                  icon: <ImBlog className="fs-4" />,
                  label: "Add Cover Category",
                },
                {
                  key: "cover-category-list",
                  icon: <FaBloggerB className="fs-4" />,
                  label: "Cover Category List",
                },
              ],
            },
            {
              key: "enquiries",
              icon: <FaClipboardList className="fs-4" />,
              label: "Enquiries",
            },
            {
              key: "signout",
              icon: <AiOutlineLogout className="fs-4" />,
              label: "Sign Out",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="d-flex gap-4 align-items-center">
          <div className="position-relative" onClick={handleNotificationsClick}>
          <IoIosNotifications className="fs-4" />
          {Array.isArray(unreadOrdersCount) && unreadOrdersCount.length > 0 && (
  <span className="badge bg-warning rounded-circle p-1 position-absolute" style={{ zIndex: 1 }}>
    {unreadOrdersCount.length}
  </span>
)}
             </div>

            <div className="d-flex gap-3 align-items-center dropdown">
              <div>
                <img
                  width={32}
                  height={32}
                  src={logo}
                  alt=""
                />
              </div>
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">Synergy Vines</h5>
                <p className="mb-0">synergyvines@gmail.com</p>
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    View Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    Signout
                  </Link>
                </li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
