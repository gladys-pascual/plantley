import axios from "axios";
import { CreateOrEditPlantData } from "../types";

const postCreatePlant = (data: CreateOrEditPlantData, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  };
  return axios
    .post("http://127.0.0.1:8000/api/plants/create", data, config)
    .then((response) => response.data);
};

export default postCreatePlant;
