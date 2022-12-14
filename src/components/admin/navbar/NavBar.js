import React from "react";
import "./Navbar.modules.scss";
import { useSelector } from "react-redux";
import { selectUserName } from "../../../redux/slice/authSlice";
import { FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const activeLink = ({isActive}) => (isActive ? 'active' : '')

const NavBar = () => {
  const userName = useSelector(selectUserName);

  return (
    <div className="navbar">
      <div className="user">
        <FaUserCircle size={40} color="#fff" />
        <h4>{userName}</h4>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/admin/home" className={activeLink}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/admin/all-products/" className={activeLink}>View Products</NavLink>
          </li>
          <li>
            <NavLink to="/admin/add-products/ADD" className={activeLink}>Add Product</NavLink>
          </li>
          <li>
            <NavLink to="/admin/orders" className={activeLink}>Orders</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
