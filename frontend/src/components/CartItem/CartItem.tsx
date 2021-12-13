import * as React from "react";
import Typography from "@mui/material/Typography";
import "./CartItem.css";

const CartItem = () => {
  return (
    <div className="cart-item">
      <div className="cart-img-wrapper">
        <img
          src={`http://127.0.0.1:8000/images/monstera_deliciosa.jpg`}
          alt=""
          className="cart-img"
        />
      </div>
      <div className="name-and-size">
        <Typography gutterBottom variant="h5" component="h5">
          plant name
        </Typography>
        <Typography gutterBottom variant="body1">
          pot size
        </Typography>
      </div>
    </div>
  );
};

export default CartItem;
