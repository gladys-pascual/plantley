import { getToken } from '../utils';
import axios from 'axios';
import { PostPaymentIntentData } from '../types';

const postPaymentIntent = (data: PostPaymentIntentData) => {
  const config = {
    headers: {
      Authorization: getToken(),
    },
  };
  return axios
    .post(`/api/orders/${data.id}/create-payment-intent/`, data, config)
    .then((response) => response.data);
};

export default postPaymentIntent;
