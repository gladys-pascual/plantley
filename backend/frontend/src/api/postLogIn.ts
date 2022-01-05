import axios from 'axios';
import { LogInData } from '../types';

const config = {
  headers: {
    'Content-type': 'application/json',
  },
};

const postLogIn = (data: LogInData) => {
  return axios
    .post('/api/users/login', data, config)
    .then((response) => response.data);
};

export default postLogIn;
