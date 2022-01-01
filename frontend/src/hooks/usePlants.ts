import { useQuery } from "react-query";
import getPlants from "../api/getPlants";
import { Plant } from "../types";

export const usePlants = () => {
  const {
    data: plants,
    isLoading: plantsLoading,
    isError: plantsError,
  } = useQuery<Plant[]>({
    queryKey: ["getPlants"],
    queryFn: () => getPlants().then((data) => data),
  });

  return {
    plants,
    plantsLoading,
    plantsError,
  };
};
