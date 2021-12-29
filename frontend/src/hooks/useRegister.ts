import { AxiosError } from "axios";
import { useMutation } from "react-query";
import postRegister from "../api/postRegister";
import { RegisterData } from "../types";
import { useNavigate } from "react-router-dom";

export const useRegister = (postRegisterError: (error: AxiosError) => void) => {
  const navigate = useNavigate();

  const {
    mutate: register,
    isLoading: registerLoading,
    isError: registerError,
  } = useMutation(
    (formData: RegisterData) => postRegister(formData).then((data) => data),
    {
      onSuccess: (data) => {
        localStorage.setItem("token", data.token);
        navigate("/users/profile");
      },
      onError: (error: AxiosError) => {
        postRegisterError(error);
      },
    }
  );

  return {
    register,
    registerLoading,
    registerError,
  };
};
