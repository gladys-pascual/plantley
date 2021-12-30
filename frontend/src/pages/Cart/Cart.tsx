import * as React from "react";
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
      <div className="cart-heading">
        {cartArrayFromStorage.length > 0 ? (
          <h1 className="cart-heading">Your cart</h1>
        ) : (
          <>
            <h1 className="cart-heading-empty">
              Your cart is currently empty.
            </h1>
            <Link to="/plants" className="shop-cart-link">
              Shop now
            </Link>
          </>
        )}
      </div>

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
