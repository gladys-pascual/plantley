import axios from 'axios';

const getPlant = (id?: string) => {
  return axios({
    method: 'get',
    url: `/api/plants/${id}`,
  }).then((response) => response.data);
};

export default getPlant;
