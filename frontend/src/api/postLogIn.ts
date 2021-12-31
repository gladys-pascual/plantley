import axios from "axios";
import { LogInData } from "../types";

const config = {
  headers: {
    "Content-type": "application/json",
  },
};

const postLogIn = (data: LogInData) => {
  return axios
    .post("http://127.0.0.1:8000/api/users/login", data, config)
    .then((response) => response.data);
};

export default postLogIn;
