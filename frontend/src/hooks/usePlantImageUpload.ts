import { Plant } from '../types';
import { useMutation, UseMutationOptions } from 'react-query';
import postPlantImage from '../api/postPlantImage';
import { AxiosError } from 'axios';

export default function usePlantImageUpload(
  mutationOptions: Partial<UseMutationOptions<Plant, AxiosError, FormData>> = {}
) {
  const {
    mutate: uploadPlantImage,
    isLoading: plantImageUploadLoading,
    isError: plantImageUploadError,
  } = useMutation<Plant, AxiosError, FormData>(postPlantImage, mutationOptions);

  return {
    uploadPlantImage,
    plantImageUploadLoading,
    plantImageUploadError,
  };
}
