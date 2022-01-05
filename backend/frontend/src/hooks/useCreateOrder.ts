import { useMutation } from 'react-query';
import postOrder from '../api/postOrder';
import { PostOrderData, Order } from '../types';

export const useCreateOrder = (createOrderSuccess: (id: number) => void) => {
  const {
    mutate: createOrder,
    isLoading: createOrderLoading,
    isError: createOrderError,
  } = useMutation(
    (orderData: PostOrderData) => postOrder(orderData).then((data) => data),
    {
      onSuccess: (data: Order) => {
        createOrderSuccess(data.id);
      },
    }
  );

  return {
    createOrder,
    createOrderLoading,
    createOrderError,
  };
};
