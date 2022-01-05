import axios from 'axios';
import { CreateOrEditPlantData } from '../types';
import { getToken } from '../utils';

const updatePlant = (data: CreateOrEditPlantData, id: string) => {
  const config = {
    headers: {
      Authorization: getToken(),
      'Content-type': 'application/json',
    },
  };

  return axios
    .put(`/api/plants/update/${id}`, data, config)
    .then((response) => response.data);
};

export default updatePlant;
