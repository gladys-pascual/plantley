import { useQuery } from "react-query";
import getPlant from "../api/getPlant";
import { Plant } from "../types";

export const usePlant = (id?: string) => {
  const {
    data: plantDetails,
    isLoading: plantDetailsLoading,
    isError: plantDetailsError,
  } = useQuery<Plant>({
    queryKey: ["getPlant", id],
    queryFn: () => getPlant(id).then((data) => data),
  });

  return {
    plantDetails,
    plantDetailsLoading,
    plantDetailsError,
  };
};
