import axios from 'axios';
import { RegisterData } from '../types';
import { getToken } from '../utils';

const updateUserProfile = (data: RegisterData) => {
  const config = {
    headers: {
      Authorization: getToken(),
      'Content-type': 'application/json',
    },
  };
  return axios
    .put('/api/users/profile/update', data, config)
    .then((response) => response.data);
};

export default updateUserProfile;
