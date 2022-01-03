import axios from 'axios';
import { getToken } from './../utils';

const config = {
  headers: {
    Authorization: getToken(),
  },
};

const getOrder = (id?: string) => {
  return axios
    .get(`http://127.0.0.1:8000/api/orders/${id}`, config)
    .then((response) => response.data);
};

export default getOrder;
