import { useQuery } from "react-query";
import getPlant from "../api/getPlant";

export const usePlant = (id?: string) => {
  const {
    data: plantDetails,
    isLoading: plantDetailsLoading,
    error: plantDetailsError,
  } = useQuery({
    queryKey: ["getPlant", id],
    queryFn: () => getPlant(id).then((data) => data),
  });

  return {
    plantDetails,
    plantDetailsLoading,
    plantDetailsError,
  };
};
