import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import updatePlant from '../api/updatePlant';
import { CreateOrEditPlantData } from '../types';

type UpdatePlantArgs = {
  formData: CreateOrEditPlantData;
  id: string;
};

export const useUpdatePlant = (
  editPlantSuccess: () => void,
  editPlantFail: (error: AxiosError) => void
) => {
  const {
    mutate: updatePlantItem,
    isLoading: updatePlantItemLoading,
    isError: updatePlantItemError,
  } = useMutation<any, AxiosError, UpdatePlantArgs>(
    ({ formData, id }) => {
      return updatePlant(formData, id).then((data) => data);
    },
    {
      onSuccess: () => {
        editPlantSuccess();
      },
      onError: (error: AxiosError) => {
        editPlantFail(error);
      },
    }
  );
  return {
    updatePlantItem,
    updatePlantItemLoading,
    updatePlantItemError,
  };
};

// updatePlantItem({ formData, id})
