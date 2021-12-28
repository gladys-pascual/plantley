import * as React from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";

import "./Header.css";

type HeaderProps = {
  hasCartItems: boolean;
};

const Header = ({ hasCartItems }: HeaderProps) => {
  return (
    <header className="header">
      <div>
        <Link to="">
          <SearchOutlinedIcon className="header-icons" />
        </Link>
      </div>
      <div>
        <Link to="/" className="shop-heading">
          <h1>PLANTLEY</h1>
        </Link>
        <div>
          <Link to="/" className="header-links">
            <span>HOME</span>
          </Link>
          <Link to="/plants" className="header-links shop">
            <span>SHOP</span>
          </Link>
          <Link to="/contact-us" className="header-links contact-us">
            <span>CONTACT US</span>
          </Link>
        </div>
      </div>
      <div>
        <Link to="/login">
          <PersonOutlineOutlinedIcon className="header-icons user-icon" />
        </Link>

        <Link to="/cart">
          {hasCartItems ? (
            <AddShoppingCartOutlinedIcon
              className="header-icons basket-icon-plus"
              color="warning"
            />
          ) : (
            <ShoppingCartOutlinedIcon className="header-icons basket-icon" />
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;
