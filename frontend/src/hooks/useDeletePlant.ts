import { useMutation } from 'react-query';
import deletePlant from '../api/deletePlant';

export const useDeletePlant = (
  deletePlantSuccess: () => void,
  deletePlantFail: () => void
) => {
  const {
    mutate: deletePlantItem,
    isLoading: deletePlantItemLoading,
    isError: deletePlantItemError,
  } = useMutation((id: string) => deletePlant(id).then((data) => data), {
    onSuccess: () => {
      deletePlantSuccess();
    },
    onError: () => {
      deletePlantFail();
    },
  });

  return {
    deletePlantItem,
    deletePlantItemLoading,
    deletePlantItemError,
  };
};
