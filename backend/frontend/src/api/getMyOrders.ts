import { getToken } from '../utils';
import axios from 'axios';

const getMyOrders = async () => {
  const response = await axios({
    method: 'get',
    url: `/api/orders/myorders/`,
    headers: {
      Authorization: getToken(),
    },
  });
  return response.data;
};

export default getMyOrders;
