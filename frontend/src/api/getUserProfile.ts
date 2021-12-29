import axios from "axios";

const getUserProfile = (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .get("http://127.0.0.1:8000/api/users/profile/", config)
    .then((response) => response.data);
};

export default getUserProfile;
