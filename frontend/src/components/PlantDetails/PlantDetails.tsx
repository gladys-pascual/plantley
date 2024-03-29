import * as React from 'react';
import { Plant } from '../../types';
import Button from '@mui/material/Button';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import CustomSnackbar from '../CustomSnackbar/CustomSnackbar';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import './PlantDetails.css';
import { useCount } from '../CountContext/CountContext';
import { Link } from 'react-router-dom';

type PlantDetailsProp = {
  plantDetails: Plant;
  handleAddToCart: (
    quantity: number,
    plantId: number,
    plantUnitPrice: number
  ) => void;
};

const PlantDetails = ({ plantDetails, handleAddToCart }: PlantDetailsProp) => {
  const {
    state: { count },
    setCount,
  } = useCount();

  const [disableDecrement, setDisableDecrement] = React.useState(false);

  const {
    name,
    image,
    price,
    potSize,
    description,
    light,
    water,
    tips,
    toxicity,
    countInStock,
  } = plantDetails;

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);

  React.useEffect(() => {
    if (count <= 1) {
      setDisableDecrement(true);
    }
    return () => {
      setDisableDecrement(false);
    };
  }, [count]);

  React.useEffect(() => {
    return () => {
      setCount(1);
    };
  }, [setCount]);

  const handleSubmitCart = () => {
    handleAddToCart(count, plantDetails.id, parseInt(plantDetails.price));
    setOpenCartSuccessSnackbar(true);
  };

  const [openCartSuccessSnackbar, setOpenCartSuccessSnackbar] =
    React.useState(false);

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenCartSuccessSnackbar(false);
  };

  return (
    <>
      <div className="plant-details-wrapper">
        <div className="plant-details">
          <div className="pic-and-info">
            <div className="plant-img-wrapper">
              <img src={`static${image}`} alt={name} className="plant-img" />
            </div>
            <div className="info">
              <Typography
                gutterBottom
                variant="h3"
                component="h3"
                className="plant-name"
              >
                {name}
              </Typography>

              <Typography
                gutterBottom
                variant="h5"
                component="h5"
                className="price"
              >
                € {price}
              </Typography>

              {potSize && (
                <Typography gutterBottom variant="body1">
                  Pot size: {potSize}
                </Typography>
              )}
              <br />
              {description && (
                <>
                  <Typography gutterBottom variant="h6">
                    Description
                  </Typography>

                  <Typography
                    gutterBottom
                    variant="body1"
                    component="p"
                    className="body-text"
                  >
                    {description}
                  </Typography>
                </>
              )}

              <br />
              <br />
              {countInStock ? (
                <div className="add-to-cart">
                  <div className="counter">
                    <button
                      className={`counter-action ${
                        disableDecrement ? 'disable-decrement' : 'decrement'
                      }`}
                      onClick={decrement}
                      disabled={disableDecrement}
                    >
                      -
                    </button>
                    <span className="counter-score">{count}</span>
                    <button
                      className="counter-action increment"
                      onClick={increment}
                    >
                      +
                    </button>
                  </div>
                  <Button
                    onClick={handleSubmitCart}
                    variant="contained"
                    endIcon={<ShoppingBasketIcon />}
                  >
                    <Typography variant="button"> add to cart</Typography>
                  </Button>
                  <div>
                    <Snackbar
                      open={openCartSuccessSnackbar}
                      autoHideDuration={6000}
                      onClose={handleCloseSnackbar}
                    >
                      <CustomSnackbar
                        onClose={handleCloseSnackbar}
                        severity="success"
                        sx={{ width: '100%' }}
                      >
                        {`You've successfully added ${count} ${name} to your `}
                        <Link to="/cart" className="cart-link">
                          cart
                        </Link>
                      </CustomSnackbar>
                    </Snackbar>
                  </div>
                </div>
              ) : (
                <div>
                  <Alert severity="warning">
                    Sorry, {name} is out of stock.
                  </Alert>
                </div>
              )}
              <br />
            </div>
          </div>
          <br />

          <div className="care-wrapper">
            <div className="care">
              {(light || water || toxicity) && (
                <Typography gutterBottom variant="h6">
                  Care
                </Typography>
              )}

              {light && (
                <>
                  <Typography gutterBottom variant="subtitle1">
                    Light
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body1"
                    className="body-text"
                  >
                    {light}
                  </Typography>
                  <br />
                </>
              )}

              {water && (
                <>
                  <Typography gutterBottom variant="subtitle1">
                    Water
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body1"
                    className="body-text"
                  >
                    {water}
                  </Typography>
                  <br />

                  <Typography gutterBottom variant="subtitle1">
                    Tips
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body1"
                    className="body-text"
                  >
                    {tips}
                  </Typography>
                  <br />
                </>
              )}

              {toxicity && (
                <>
                  <Typography gutterBottom variant="subtitle1">
                    Toxicity
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body1"
                    className="body-text"
                  >
                    {toxicity}
                  </Typography>
                </>
              )}

              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlantDetails;
