import * as React from "react";
import { useUserProfile } from "../../hooks/useUserProfile";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";

type UserProfileProps = {
  handleLogOut: () => void;
};

const UserProfile = ({ handleLogOut }: UserProfileProps) => {
  const { userProfile, userProfileLoading, userProfileError } =
    useUserProfile();

  return (
    <section>
      {userProfileLoading && <Loading />}
      {!userProfileLoading && userProfileError && <Error />}
      {userProfile && (
        <>
          <h1>Account Details </h1>
          <button onClick={() => handleLogOut()}>Log Out</button>
          <h2>Welcome, {userProfile.name}</h2>
        </>
      )}
    </section>
  );
};

export default UserProfile;
