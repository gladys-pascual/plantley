import { useQuery } from 'react-query';
import getMyOrders from '../api/getMyOrders';
import { Order } from '../types';

export default function useMyOrders() {
  const {
    data: myOrders,
    isLoading: myOrdersLoading,
    isError: myOrdersError,
  } = useQuery<Order[]>({
    queryKey: ['myOrders'],
    queryFn: () => getMyOrders().then((data) => data),
  });

  return {
    myOrders,
    myOrdersLoading,
    myOrdersError,
  };
}
