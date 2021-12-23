import * as React from "react";
import Typography from "@mui/material/Typography";
import "./Cart.css";
import CartItem from "../../components/CartItem/CartItem";
import { Link } from "react-router-dom";

type CartProps = {
  cartArrayFromStorage: { plantId: number; quantity: number }[];
  handleRemoveToCart: (plantId: number) => void;
};

const Cart = ({ cartArrayFromStorage, handleRemoveToCart }: CartProps) => {
  return (
    <div className="cart">
      {cartArrayFromStorage.length > 0 ? (
        <Typography
          gutterBottom
          variant="h3"
          component="h3"
          align="center"
          className="cart-heading"
        >
          Your cart
        </Typography>
      ) : (
        <Typography
          gutterBottom
          variant="h3"
          component="h3"
          align="center"
          className="cart-heading-empty"
        >
          Your cart is currently empty.
          <div>
            <Link to="/plants" className="shop-cart-link">
              Shop now
            </Link>
          </div>
        </Typography>
      )}

      <div className="cart-items">
        {cartArrayFromStorage.map((item) => (
          <CartItem
            key={item.plantId}
            item={item}
            handleRemoveToCart={handleRemoveToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Cart;
