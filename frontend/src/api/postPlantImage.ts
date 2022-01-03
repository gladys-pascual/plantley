import { getToken } from './../utils';
import axios from 'axios';
import { Plant } from '../types';

const postPlantImage = async (formData: FormData): Promise<Plant> => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: getToken(),
    },
  };
  const response = await axios.post(
    `http://127.0.0.1:8000/api/plants/upload`,
    formData,
    config
  );
  return response.data;
};

export default postPlantImage;
