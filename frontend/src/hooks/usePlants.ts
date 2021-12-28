import { useQuery } from "react-query";
import getPlants from "../api/getPlants";

export const usePlants = () => {
  const {
    data: plants,
    isLoading: plantsLoading,
    isError: plantsError,
  } = useQuery({
    queryKey: ["getPlants"],
    queryFn: () => getPlants().then((data) => data),
  });

  return {
    plants,
    plantsLoading,
    plantsError,
  };
};
