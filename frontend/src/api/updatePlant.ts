import axios from "axios";
import { CreateOrEditPlantData } from "../types";

const updatePlant = (
  data: CreateOrEditPlantData,
  id: string,
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  };

  return axios
    .put(`http://127.0.0.1:8000/api/plants/update/${id}`, data, config)
    .then((response) => response.data);
};

export default updatePlant;
