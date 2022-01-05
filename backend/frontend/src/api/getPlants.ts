import axios from 'axios';

const getPlants = () => {
  return axios({
    method: 'get',
    url: '/api/plants/',
  }).then((response) => response.data);
};

export default getPlants;
