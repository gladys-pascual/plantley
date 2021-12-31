import axios from "axios";
import { RegisterData } from "../types";

const updateUserProfile = (data: RegisterData, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  };
  return axios
    .put("http://127.0.0.1:8000/api/users/profile/update", data, config)
    .then((response) => response.data);
};

export default updateUserProfile;
