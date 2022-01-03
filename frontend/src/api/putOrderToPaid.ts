import axios from 'axios';
import { UpdateOrderToPaidPayload } from '../types';
import { getToken } from '../utils';

const putOrderToPaid = (data: UpdateOrderToPaidPayload) => {
  const config = {
    headers: {
      Authorization: getToken(),
    },
  };

  return axios
    .put(`http://127.0.0.1:8000/api/orders/${data.orderId}/pay/`, data, config)
    .then((response) => response.data);
};

export default putOrderToPaid;
