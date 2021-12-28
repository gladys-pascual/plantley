import { AxiosError } from "axios";
import { useMutation } from "react-query";
import postLogIn from "../api/postLogIn";
import { LogInData } from "../types";

export const useLogIn = (postLogInFail: (error: AxiosError) => void) => {
  const {
    mutate: logIn,
    isLoading: logInLoading,
    isError: logInError,
    data: logInData,
  } = useMutation(
    (formData: LogInData) => postLogIn(formData).then((data) => data),
    {
      onSuccess: (data) => {
        console.log(`data`, data);
        // save data in local storage
        // navigate to profile
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
