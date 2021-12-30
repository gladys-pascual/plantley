import * as React from "react";
import { useUserProfile } from "../../hooks/useUserProfile";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import "./UserProfile.css";
import { Link } from "react-router-dom";

type UserProfileProps = {
  handleLogOut: () => void;
};

const UserProfile = ({ handleLogOut }: UserProfileProps) => {
  const { userProfile, userProfileLoading, userProfileError } =
    useUserProfile();

  return (
    <section className="user-profile-wrapper">
      {userProfileLoading && <Loading />}
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
          <Typography gutterBottom variant="h6">
            Welcome, {userProfile.name}
          </Typography>
          <div className="update-profile-link-wrapper">
            <Link to="/plants" className="update-profile-link">
              Update Profile
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default UserProfile;
