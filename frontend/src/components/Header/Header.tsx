import * as React from "react";
import HeaderBigScreen from "../HeaderBigScreen/HeaderBigScreen";
import { HeaderProps } from "../../types";
import "./Header.css";
import HeaderSmallScreen from "../HeaderSmallScreen/HeaderSmallSceen";

const Header = ({ hasCartItems, hasTokenInLocalStorage }: HeaderProps) => {
  return (
    <>
      <div className="header-big-screen">
        <HeaderBigScreen
          hasCartItems={hasCartItems}
          hasTokenInLocalStorage={hasTokenInLocalStorage}
        />
      </div>
      <div className="header-small-screen">
        <HeaderSmallScreen
          hasCartItems={hasCartItems}
          hasTokenInLocalStorage={hasTokenInLocalStorage}
        />
      </div>
    </>
  );
};

export default Header;
