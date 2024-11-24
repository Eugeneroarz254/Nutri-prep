import React, { useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function MediaSidebarItem({ item, onClick }) {
  const [open, setOpen] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  const authState = useSelector(state => state?.auth);
  const user = authState?.user?.user ? authState?.user?.user : authState?.user;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleLogin = () => {
   navigate("/login")
  };

  const showSideBar = () => {
    setSidebar(!sidebar);
    onClick(); // Call the onClick prop to close the sidebar
  };

  if (item.title === "My Account") {
    // Conditionally show "My Account" only if the user is logged in
    return (
      <div className={user === null ? "d-none" : "sidebar-item"}>
        <div className="sidebar-title">
          <span>
            {item.icon && <i className={item.icon}></i>}
            {item.title}
          </span>
          <i
            className="bi-chevron-down toggle-btn"
            onClick={() => setOpen(!open)}
          ></i>
        </div>
        <div className={open ? "sidebar-content open" : "sidebar-content"}>
          {item.childrens.map((child, index) => (
            <MediaSidebarItem
              key={index}
              item={child}
              onClick={showSideBar}
            />
          ))}
        </div>
      </div>
    );
  }

  if (item.childrens) {
    return (
      <div className={open ? "sidebar-item open" : "sidebar-item"}>
        <div className="sidebar-title">
          <span>
            {item.icon && <i className={item.icon}></i>}
            {item.title}
          </span>
          <i
            className="bi-chevron-down toggle-btn"
            onClick={() => setOpen(!open)}
          ></i>
        </div>
        <div className="sidebar-content">
          {item.childrens.map((child, index) => (
            <MediaSidebarItem
              key={index}
              item={child}
              onClick={showSideBar}
            />
          ))}
        </div>
      </div>
    );
  } else if (item.title === "Logout") {
    return (
      <div className={user === null ? "d-none" : "d-flex sidebar-btn-container"}>
        <button className="sidebar-btn" onClick={handleLogout}>
          <AiOutlineLogout /> {item.icon && <item.icon className="icon" />}
          {item.title}
        </button>
      </div>
    );
  } else if (item.title === "Log In") {
    return (
      <div className={user === null ? "d-flex sidebar-btn-container" : "d-none"}>
        <button className="sidebar-btn" onClick={handleLogin}>
          {item.icon && <item.icon className="icon" />}
          {item.title}
        </button>
      </div>
    );
  } else {
    return (
      <a href={item.path || "#"} className="sidebar-item plain">
        {item.icon && <item.icon className="icon" onClick={showSideBar} />}
        {item.title}
      </a>
    );
  }
}
