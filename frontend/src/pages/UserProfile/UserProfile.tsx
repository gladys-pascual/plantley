import * as React from "react";
import { useUserProfile } from "../../hooks/useUserProfile";

type UserProfileProps = {
  handleLogOut: () => void;
};

const UserProfile = ({ handleLogOut }: UserProfileProps) => {
  const { userProfile, userProfileLoading, userProfileError } =
    useUserProfile();

  const { name } = userProfile;

  console.log(`userProfile`, userProfile);
  return (
    <section>
      <h1>Account Details </h1>
      <button onClick={() => handleLogOut()}>Log Out</button>
      <h2>Welcome, {name}</h2>
    </section>
  );
};

export default UserProfile;
