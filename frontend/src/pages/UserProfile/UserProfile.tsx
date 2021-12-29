import * as React from "react";

type UserProfileProps = {
  handleLogOut: () => void;
};

const UserProfile = ({ handleLogOut }: UserProfileProps) => {
  return (
    <section>
      <h1>Account Details </h1>
      <button onClick={() => handleLogOut()}>Log Out</button>
    </section>
  );
};

export default UserProfile;
