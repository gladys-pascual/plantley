import { useQuery } from "react-query";
import getUserProfile from "../api/getUserProfile";

export const useUserProfile = () => {
  const token = localStorage.getItem("token") as string;

  const {
    data: userProfile,
    isLoading: userProfileLoading,
    isError: userProfileError,
  } = useQuery({
    queryKey: ["getUserProfile", token],
    queryFn: () => getUserProfile(token).then((data) => data),
  });

  return {
    userProfile,
    userProfileLoading,
    userProfileError,
  };
};
