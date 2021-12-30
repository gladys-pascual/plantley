import * as React from "react";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import "./HeaderSmallScreen.css";
import { HeaderProps } from "../../types";
import MenuIcon from "@mui/icons-material/Menu";

const HeaderSmallScreen = ({
  hasCartItems,
  hasTokenInLocalStorage,
}: HeaderProps) => {
  return (
    <header className="header-small">
      <nav className="navbar">
        <ul>
          <div className="dropdown">
            <button className="dropbtn">
              <MenuIcon fontSize="large" />
            </button>
            <div className="dropdown-content">
              <li>
                <Link to="/" className="header-links-small">
                  <span>HOME</span>
                </Link>
              </li>
              <li>
                <Link to="/plants" className="header-links-small">
                  <span>SHOP</span>
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="header-links-small">
                  <span>CONTACT US</span>
                </Link>
              </li>
              <li>
                {hasTokenInLocalStorage ? (
                  <Link to="/users/profile" className="header-links-small">
                    <span>PROFILE</span>
                  </Link>
                ) : (
                  <Link to="/login" className="header-links-small">
                    <span>LOGIN</span>
                  </Link>
                )}
              </li>
            </div>
          </div>
        </ul>
      </nav>
      <div className="cart-small">
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

export default HeaderSmallScreen;
