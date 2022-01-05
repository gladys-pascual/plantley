import { useQuery, UseQueryOptions } from 'react-query';
import getPlants from '../api/getPlants';
import { Plant } from '../types';

export const usePlants = (
  queryProps: Partial<UseQueryOptions<Plant[]>> = {}
) => {
  const {
    data: plants,
    isLoading: plantsLoading,
    isError: plantsError,
  } = useQuery<Plant[]>({
    queryKey: ['getPlants'],
    queryFn: () => getPlants().then((data) => data),
    ...queryProps,
  });

  return {
    plants,
    plantsLoading,
    plantsError,
  };
};
