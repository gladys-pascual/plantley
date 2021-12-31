import axios from "axios";

const getPlants = () => {
  return axios({
    method: "get",
    url: "http://127.0.0.1:8000/api/plants",
  }).then((response) => response.data);
};

export default getPlants;
