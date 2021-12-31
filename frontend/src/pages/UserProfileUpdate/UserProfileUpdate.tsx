import * as React from "react";
import { useUserProfile } from "../../hooks/useUserProfile";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import "./UserProfile.css";
import UserProfileUpdateForm from "../../components/UserProfileUpdateForm/UserProfileUpdateForm";
import { RegisterData } from "../../types";

type UserProfileProps = {
  handleLogOut: () => void;
  updateUserProfileErrorMessage: string;
  handleUserProfileUpdate: (data: RegisterData) => void;
};

const UserProfile = ({
  handleLogOut,
  updateUserProfileErrorMessage,
  handleUserProfileUpdate,
}: UserProfileProps) => {
  const { userProfile, userProfileLoading, userProfileError } =
    useUserProfile();

  if (userProfileLoading) {
    return <Loading />;
  }

  return (
    <section className="user-profile-wrapper">
      {!userProfileLoading && userProfileError && <Error />}
      {userProfile && (
        <div className="user-profile">
          <div className="heading-and-logout">
            <h1>Account Details </h1>
            <Button
              onClick={() => handleLogOut()}
              variant="contained"
              endIcon={<LogoutOutlinedIcon />}
            >
              <Typography variant="button"> Logout </Typography>
            </Button>
          </div>
          <Typography
            gutterBottom
            variant="h6"
            className="user-profile-update-heading"
          >
            Update your profile
          </Typography>
          <div className="user-profile-update-form">
            <UserProfileUpdateForm
              userProfile={userProfile}
              updateUserProfileErrorMessage={updateUserProfileErrorMessage}
              handleUserProfileUpdate={handleUserProfileUpdate}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default UserProfile;
