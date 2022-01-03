import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import postCreatePlant from '../api/postCreatePlant';
import { CreateOrEditPlantData } from '../types';

export const useCreatePlant = (
  createPlantSuccess: () => void,
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
