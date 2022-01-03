import { getToken } from './../utils';
import axios from 'axios';
import { PostPaymentIntentData } from '../types';

const postPaymentIntent = (data: PostPaymentIntentData) => {
  const config = {
    headers: {
      Authorization: getToken(),
    },
  };
  return axios
    .post(
      `http://127.0.0.1:8000/api/orders/${data.id}/create-payment-intent/`,
      data,
      config
    )
    .then((response) => response.data);
};

export default postPaymentIntent;
