import * as React from "react";
import Typography from "@mui/material/Typography";
import "./Cart.css";
import CartItem from "../../components/CartItem/CartItem";

const Cart = () => {
  return (
    <div className="cart">
      <Typography
        gutterBottom
        variant="h3"
        component="h3"
        align="center"
        className="cart-heading"
      >
        Your cart
      </Typography>
      <div className="cart-items">
        <CartItem />
      </div>
    </div>
  );
};

export default Cart;
