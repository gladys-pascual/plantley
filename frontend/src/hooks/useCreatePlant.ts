import { AxiosError } from "axios";
import { useMutation } from "react-query";
import postCreatePlant from "../api/postCreatePlant";
import { CreateOrEditPlantData } from "../types";

export const useCreatePlant = (
  createPlantSuccess: () => void,
  createPlantFail: (error: AxiosError) => void
) => {
  const token = localStorage.getItem("token") as string;
  const {
    mutate: createPlant,
    isLoading: createPlantLoading,
    isError: createPlantError,
  } = useMutation(
    (formData: CreateOrEditPlantData) =>
      postCreatePlant(formData, token).then((data) => data),
    {
      onSuccess: () => {
        createPlantSuccess();
      },

      onError: (error: AxiosError) => {
        createPlantFail(error);
      },
    }
  );

  return {
    createPlant,
    createPlantLoading,
    createPlantError,
  };
};
