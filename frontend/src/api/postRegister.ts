import axios from "axios";
import { RegisterData } from "../types";

const config = {
  headers: {
    "Content-type": "application/json",
  },
};

const postLogIn = (data: RegisterData) => {
  return axios
    .post("http://127.0.0.1:8000/api/users/register", data, config)
    .then((response) => response.data);
};

export default postLogIn;
