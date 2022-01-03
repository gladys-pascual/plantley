import { getToken } from './../utils';
import axios from 'axios';

const getMyOrders = async () => {
  const response = await axios({
    method: 'get',
    url: `http://127.0.0.1:8000/api/orders/myorders/`,
    headers: {
      Authorization: getToken(),
    },
  });
  return response.data;
};

export default getMyOrders;
