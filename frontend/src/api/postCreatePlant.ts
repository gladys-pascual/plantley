import axios from 'axios';
import { CreateOrEditPlantData } from '../types';
import { getToken } from './../utils';

const postCreatePlant = (data: CreateOrEditPlantData) => {
  const config = {
    headers: {
      Authorization: getToken(),
      'Content-type': 'application/json',
    },
  };
  return axios
    .post('http://127.0.0.1:8000/api/plants/create', data, config)
    .then((response) => response.data);
};

export default postCreatePlant;
