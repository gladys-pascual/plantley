import axios from 'axios';
import { getToken } from './../utils';

const deletePlant = (id: string) => {
  const config = {
    headers: {
      Authorization: getToken(),
      'Content-type': 'application/json',
    },
  };

  return axios
    .delete(`http://127.0.0.1:8000/api/plants/delete/${id}`, config)
    .then((response) => response.data);
};

export default deletePlant;
