import axios from 'axios';
import { CreateOrEditPlantData } from '../types';
import { getToken } from '../utils';

const postCreatePlant = (data: CreateOrEditPlantData) => {
  const config = {
    headers: {
      Authorization: getToken(),
      'Content-type': 'application/json',
    },
  };
  return axios
    .post('/api/plants/create', data, config)
    .then((response) => response.data);
};

export default postCreatePlant;
