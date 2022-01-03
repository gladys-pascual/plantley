import * as React from 'react';
import './Cart.css';
import CartItem from '../../components/CartItem/CartItem';
import { Link } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

type CartProps = {
  cartArrayFromStorage: {
    plantId: number;
    quantity: number;
    plantUnitPrice: number;
  }[];
  handleRemoveToCart: (plantId: number) => void;
};

const Cart = ({ cartArrayFromStorage, handleRemoveToCart }: CartProps) => {
  const totalPrice = cartArrayFromStorage.reduce((runningTotal, cartItem) => {
    return runningTotal + cartItem.quantity * cartItem.plantUnitPrice;
  }, 0);

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
          <>
            <CartItem
              key={item.plantId}
              item={item}
              handleRemoveToCart={handleRemoveToCart}
            />
            <Divider variant="middle" />
          </>
        ))}
      </div>
      {!!cartArrayFromStorage.length && (
        <>
          <h1 className="total-price">Total Price: € {`${totalPrice}`} </h1>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/checkout/shipping"
            className="checkout-button"
          >
            <Typography variant="button"> Checkout </Typography>
          </Button>
        </>
      )}
    </div>
  );
};

export default Cart;
