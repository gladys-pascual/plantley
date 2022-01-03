import { useQuery } from 'react-query';
import getUserProfile from '../api/getUserProfile';
import { UserProfileResponse } from '../types';

export const useUserProfile = () => {
  const {
    data: userProfile,
    isLoading: userProfileLoading,
    isError: userProfileError,
  } = useQuery<UserProfileResponse>({
    queryKey: ['getUserProfile'],
    queryFn: () => getUserProfile().then((data) => data),
  });

  return {
    userProfile,
    userProfileLoading,
    userProfileError,
  };
};
