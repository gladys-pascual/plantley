import { useQuery } from 'react-query';
import getOrder from '../api/getOrder';
import { Order } from '../types';

export const useOrder = (id: string) => {
  const {
    data: orderDetails,
    isLoading: orderDetailsLoading,
    isError: orderDetailsError,
  } = useQuery<Order>({
    queryKey: ['getOrder', id],
    queryFn: () => getOrder(id).then((data) => data),
  });

  return {
    orderDetails,
    orderDetailsLoading,
    orderDetailsError,
  };
};
