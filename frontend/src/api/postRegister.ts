import axios from 'axios';
import { RegisterData } from '../types';

const config = {
  headers: {
    'Content-type': 'application/json',
  },
};

const postLogIn = (data: RegisterData) => {
  return axios
    .post('/api/users/register', data, config)
    .then((response) => response.data);
};

export default postLogIn;
