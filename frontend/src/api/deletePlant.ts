import axios from "axios";

const deletePlant = (id: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  };

  return axios
    .delete(`http://127.0.0.1:8000/api/plants/delete/${id}`, config)
    .then((response) => response.data);
};

export default deletePlant;
