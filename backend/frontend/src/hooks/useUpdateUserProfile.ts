import { useMutation } from 'react-query';
import updateUserProfile from '../api/updateUserProfile';
import { RegisterData } from '../types';
import { useNavigate } from 'react-router-dom';

export const useUpdateUserProfile = (
  updateUserProfileSuccess: () => void,
  updateUserProfileError: () => void
) => {
  const navigate = useNavigate();

  const {
    mutate: userProfileUpdate,
    isLoading: userProfileUpdateLoading,
    isError: userProfileUpdateError,
    data: userProfileUpdateData,
  } = useMutation(
    (formData: RegisterData) =>
      updateUserProfile(formData).then((data) => data),
    {
      onSuccess: (data) => {
        localStorage.setItem('token', data.token);
        navigate('/users/profile');
        updateUserProfileSuccess();
      },
      onError: () => {
        updateUserProfileError();
      },
    }
  );

  return {
    userProfileUpdate,
    userProfileUpdateLoading,
    userProfileUpdateError,
    userProfileUpdateData,
  };
};
