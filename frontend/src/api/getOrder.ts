import axios from 'axios';
import { getToken } from '../utils';

const config = {
  headers: {
    Authorization: getToken(),
  },
};

const getOrder = (id?: string) => {
  return axios
    .get(`/api/orders/${id}`, config)
    .then((response) => response.data);
};

export default getOrder;
