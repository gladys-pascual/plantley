import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import postCreatePlant from '../api/postCreatePlant';
import { CreateOrEditPlantData, Plant } from '../types';

export const useCreatePlant = (
  createPlantSuccess: (data: Plant) => void,
  createPlantFail: (error: AxiosError) => void
) => {
  const {
    mutate: createPlant,
    isLoading: createPlantLoading,
    isError: createPlantError,
  } = useMutation(
    (formData: CreateOrEditPlantData) =>
      postCreatePlant(formData).then((data) => data),
    {
      onSuccess: (data) => {
        createPlantSuccess(data);
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
