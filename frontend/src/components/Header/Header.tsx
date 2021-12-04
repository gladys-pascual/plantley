import * as React from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import { NavLink, Link } from "react-router-dom";

import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div>
        <Link to="">
          <SearchOutlinedIcon className="header-icons" />
        </Link>
      </div>
      <div>
        <Link to="" className="shop-heading">
          <h1>PLANTLEY</h1>
        </Link>
        <div>
          <NavLink to="" className="header-links shop">
            <span>SHOP</span>
          </NavLink>
          <NavLink to="" className="header-links contact-us">
            <span>CONTACT US</span>
          </NavLink>
        </div>
      </div>
      <div>
        <Link to="">
          <PersonOutlineOutlinedIcon className="header-icons user-icon" />
        </Link>

        <Link to="">
          <ShoppingBasketOutlinedIcon className="header-icons basket-icon" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
