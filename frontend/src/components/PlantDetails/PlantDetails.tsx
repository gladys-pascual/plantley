import * as React from "react";
import { Plant } from "../../types";
import Button from "@mui/material/Button";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";

import "./PlantDetails.css";

type PlantDetailsProp = {
  plantDetails: Plant;
};

const PlantDetails = ({ plantDetails }: PlantDetailsProp) => {
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

  return (
    <div className="plant-details-wrapper">
      <div className="plant-details">
        <div className="pic-and-info">
          <div className="plant-img-wrapper">
            <img
              src={`http://127.0.0.1:8000${image}`}
              alt={name}
              className="plant-img"
            />
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

            <Typography gutterBottom variant="body1">
              Pot size: {potSize}
            </Typography>
            <br />

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
            <br />
            <br />
            {countInStock ? (
              <div className="add-to-cart">
                <TextField
                  id="outlined-number"
                  label="Quantity"
                  name="quantity"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{ inputMode: "numeric", min: 0 }}
                  size="small"
                />
                <Button
                  onClick={() => console.log("hello")}
                  variant="contained"
                  endIcon={<ShoppingBasketIcon />}
                >
                  <Typography variant="button"> add to cart</Typography>
                </Button>
              </div>
            ) : (
              <div>
                <Alert severity="warning">Sorry, {name} is out of stock.</Alert>
              </div>
            )}
            <br />
          </div>
        </div>
        <br />

        <div className="care-wrapper">
          <div className="care">
            <Typography gutterBottom variant="h6">
              Care
            </Typography>

            <Typography gutterBottom variant="subtitle1">
              Light
            </Typography>
            <Typography gutterBottom variant="body1" className="body-text">
              {light}
            </Typography>
            <br />

            <Typography gutterBottom variant="subtitle1">
              Water
            </Typography>
            <Typography gutterBottom variant="body1" className="body-text">
              {water}
            </Typography>
            <br />

            <Typography gutterBottom variant="subtitle1">
              Tips
            </Typography>
            <Typography gutterBottom variant="body1" className="body-text">
              {tips}
            </Typography>
            <br />

            <Typography gutterBottom variant="subtitle1">
              Toxicity
            </Typography>
            <Typography gutterBottom variant="body1" className="body-text">
              {toxicity}
            </Typography>
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetails;
