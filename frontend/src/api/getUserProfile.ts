import axios from 'axios';
import { getToken } from '../utils';

const config = {
  headers: {
    Authorization: getToken(),
  },
};

const getUserProfile = () => {
  return axios
    .get('/api/users/profile', config)
    .then((response) => response.data);
};

export default getUserProfile;
