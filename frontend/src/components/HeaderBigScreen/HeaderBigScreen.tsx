import * as React from "react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import "./HeaderBigScreen.css";
import { HeaderProps } from "../../types";

const HeaderBigScreen = ({
  hasCartItems,
  hasTokenInLocalStorage,
}: HeaderProps) => {
  return (
    <header className="header">
      <div>
        <Link to="/" className="shop-heading">
          <h1>PLANTLEY</h1>
        </Link>
      </div>
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
      <ul className="profile-and-cart">
        <li>
          {hasTokenInLocalStorage ? (
            <Link to="/users/profile">
              <PersonOutlineOutlinedIcon className="header-icons user-icon" />
            </Link>
          ) : (
            <Link to="/login">
              <PersonOutlineOutlinedIcon className="header-icons user-icon" />
            </Link>
          )}
        </li>

        <li className="cart-icon">
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
        </li>
      </ul>
    </header>
  );
};

export default HeaderBigScreen;
