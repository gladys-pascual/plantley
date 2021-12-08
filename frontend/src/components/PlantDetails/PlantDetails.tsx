import * as React from "react";
import { Plant } from "../../types";

type PlantDetailsProp = {
  plantDetails: Plant;
};

const PlantDetails = ({ plantDetails }: PlantDetailsProp) => {
  return (
    <div>
      <p>go back..</p>
      <p>{plantDetails.name}</p>
    </div>
  );
};

export default PlantDetails;
