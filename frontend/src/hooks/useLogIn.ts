import { AxiosError } from "axios";
import { useMutation } from "react-query";
import postLogIn from "../api/postLogIn";
import { LogInData } from "../types";
import { useNavigate } from "react-router-dom";

export const useLogIn = (postLogInFail: (error: AxiosError) => void) => {
  const navigate = useNavigate();

  const {
    mutate: logIn,
    isLoading: logInLoading,
    isError: logInError,
    data: logInData,
  } = useMutation(
    (formData: LogInData) => postLogIn(formData).then((data) => data),
    {
      onSuccess: (data) => {
        localStorage.setItem("token", data.token);
        navigate("/users/profile");
      },
      onError: (error: AxiosError) => {
        postLogInFail(error);
      },
    }
  );

  return {
    logIn,
    logInLoading,
    logInError,
    logInData,
  };
};
