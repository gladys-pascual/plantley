import axios from "axios";

const getPlant = (id?: string) => {
  return axios({
    method: "get",
    url: `http://127.0.0.1:8000/api/plants/${id}`,
  }).then((response) => response.data);
};

export default getPlant;
