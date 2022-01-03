import { getToken } from './../utils';
import axios from 'axios';
import { PostOrderData } from '../types';

const postOrder = (data: PostOrderData) => {
  const config = {
    headers: {
      Authorization: getToken(),
    },
  };
  return axios
    .post('http://127.0.0.1:8000/api/orders/add/', data, config)
    .then((response) => response.data);
};

export default postOrder;
