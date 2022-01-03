import * as React from 'react';
import Typography from '@mui/material/Typography';
import './CartItem.css';
import { usePlant } from '../../hooks/usePlant';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';
import DeleteIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';

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
              <div className="quantity-and-unit-price">
                <Typography gutterBottom variant="body1">
                  Quantity: {item.quantity}
                </Typography>
                <Typography gutterBottom variant="body1" className="unit-price">
                  Unit Price: {`€ ${plantDetails.price}`}
                </Typography>
              </div>
              <Typography gutterBottom variant="h6">
                Total: {`€ ${price}`}
              </Typography>
              <Button
                onClick={() => handleRemoveToCart(plantDetails.id)}
                variant="contained"
                endIcon={<DeleteIcon />}
                className="remove-cart-button"
                color="warning"
              >
                <Typography variant="button"> Remove from cart </Typography>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartItem;
