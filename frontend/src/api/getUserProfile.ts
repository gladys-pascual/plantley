import axios from 'axios';
import { getToken } from './../utils';

const config = {
  headers: {
    Authorization: getToken(),
  },
};

const getUserProfile = () => {
  return axios
    .get('http://127.0.0.1:8000/api/users/profile', config)
    .then((response) => response.data);
};

export default getUserProfile;
