import * as React from "react";
import { useUserProfile } from "../../hooks/useUserProfile";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import "./UserProfile.css";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";

type UserProfileProps = {
  handleLogOut: () => void;
  isUpdateUserProfileSuccess: boolean;
};

const UserProfile = ({
  handleLogOut,
  isUpdateUserProfileSuccess,
}: UserProfileProps) => {
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
          <Typography gutterBottom variant="h6" className="welcome-name">
            Welcome, {userProfile.name}
          </Typography>
          <div className="update-profile-link-wrapper">
            <Link to="/users/profile/update" className="update-profile-link">
              Update Profile
            </Link>
          </div>
          {isUpdateUserProfileSuccess && (
            <Alert
              sx={{ width: "50%" }}
              severity="success"
              className="update-profile-success-message"
            >
              Your profile was updated successfully!
            </Alert>
          )}
          {userProfile?.isAdmin && (
            <div className="admin-functionality">
              <h1>Admin Functionality </h1>
              <ul className="admin-links">
                <li>
                  <Link to="">Manage Users</Link>
                </li>
                <li>
                  <Link to="/admin/productlist">Manage Products</Link>
                </li>
                <li>
                  <Link to="">Manage Orders</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default UserProfile;
