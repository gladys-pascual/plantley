import axios from 'axios';
import { getToken } from '../utils';

const deletePlant = (id: string) => {
  const config = {
    headers: {
      Authorization: getToken(),
      'Content-type': 'application/json',
    },
  };

  return axios
    .delete(`/api/plants/delete/${id}`, config)
    .then((response) => response.data);
};

export default deletePlant;
