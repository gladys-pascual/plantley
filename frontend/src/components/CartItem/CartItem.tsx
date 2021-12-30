import * as React from "react";
import Typography from "@mui/material/Typography";
import "./CartItem.css";
import { usePlant } from "../../hooks/usePlant";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Clear";

type CartItemProps = {
  item: {
    plantId: number;
    quantity: number;
  };
  handleRemoveToCart: (plantId: number) => void;
};

const CartItem = ({ item, handleRemoveToCart }: CartItemProps) => {
  const { plantDetails, plantDetailsLoading, plantDetailsError } = usePlant(
    item.plantId.toString()
  );

  const price = item.quantity * parseInt(plantDetails?.price as string);

  return (
    <>
      {plantDetailsLoading && <Loading />}
      {plantDetailsError && <Error />}
      {plantDetails && (
        <div className="cart-item">
          <div className="cart-item-details">
            <div className="cart-img-wrapper">
              <img
                src={`http://127.0.0.1:8000${plantDetails.image}`}
                alt={plantDetails.name}
                className="cart-img"
              />
            </div>
            <div className="name-and-size">
              <Typography gutterBottom variant="h5" component="h5">
                {`${plantDetails.name}, ${plantDetails.potSize}`}
              </Typography>
              <Typography gutterBottom variant="body1">
                Quantity: {item.quantity}
              </Typography>
              <Typography gutterBottom variant="body1">
                Price: {`€ ${price}`}
              </Typography>
            </div>
          </div>
          <IconButton
            aria-label="delete"
            onClick={() => handleRemoveToCart(plantDetails.id)}
            className="delete-button"
          >
            <DeleteIcon />
          </IconButton>
        </div>
      )}
    </>
  );
};

export default CartItem;
