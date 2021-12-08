import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import "./PlantCard.css";

type PlantCardProps = {
  image: string;
  name: string;
  price: string;
};

const PlantCard = ({ image, name, price }: PlantCardProps) => {
  return (
    <div className="plant-card-wrapper">
      <Card className="plant-card" sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="300"
            image={`http://127.0.0.1:8000${image}`}
            alt={name}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="h6" align="center">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              € {price}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default PlantCard;
