import * as React from "react";
import Typography from "@mui/material/Typography";
import "./Cart.css";
import CartItem from "../../components/CartItem/CartItem";

type CartProps = {
  cartArrayFromStorage: { plantId: number; quantity: number }[];
  handleRemoveToCart: (plantId: number) => void;
};

const Cart = ({ cartArrayFromStorage, handleRemoveToCart }: CartProps) => {
  console.log(`cartArrayFromStorage`, cartArrayFromStorage);
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
        {cartArrayFromStorage.map((item) => (
          <CartItem item={item} handleRemoveToCart={handleRemoveToCart} />
        ))}
      </div>
    </div>
  );
};

export default Cart;
