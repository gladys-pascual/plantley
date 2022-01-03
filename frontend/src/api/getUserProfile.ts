import axios from 'axios';
import { getToken } from './../utils';

const getUserProfile = () => {
  const config = {
    headers: {
      Authorization: getToken(),
    },
  };
  return axios
    .get('http://127.0.0.1:8000/api/users/profile', config)
    .then((response) => response.data);
};

export default getUserProfile;
