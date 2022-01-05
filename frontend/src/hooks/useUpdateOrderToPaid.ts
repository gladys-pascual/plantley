import { useMutation } from 'react-query';
import putOrderToPaid from '../api/putOrderToPaid';
import { UpdateOrderToPaidPayload } from '../types';

export const useUpdateOrderToPaid = () => {
  const {
    mutate: updateOrderToPaid,
    isLoading: updateOrderToPaidLoading,
    error: updateOrderToPaidError,
  } = useMutation((payload: UpdateOrderToPaidPayload) =>
    putOrderToPaid(payload).then((data) => data)
  );
  return {
    updateOrderToPaid,
    updateOrderToPaidLoading,
    updateOrderToPaidError,
  };
};
