import * as React from "react";
import LogInForm from "../../components/LogInForm/LogInForm";
import { LogInData } from "../../types";
import { useLogIn } from "../../hooks/useLogIn";
import { AxiosError } from "axios";

const LogInPage = () => {
  const [isLogInError, setIsLogInError] = React.useState(false);
  const [logInErrorMessage, setLogInErrorMessage] = React.useState("");

  const postLogInFail = (error: AxiosError) => {
    setIsLogInError(true);
    if (error?.response?.status === 401) {
      console.log(`errorresponse`, error.response);
      setLogInErrorMessage(error?.response?.data.detail);
    } else {
      setLogInErrorMessage("Something went wrong, please try again.");
    }
  };

  const { logIn, logInLoading, logInError, logInData } =
    useLogIn(postLogInFail);

  const handleLogIn = (data: LogInData) => {
    logIn(data);
    console.log(`data`, data);
  };

  return (
    <section>
      <LogInForm
        handleLogIn={handleLogIn}
        isLogInError={isLogInError}
        logInErrorMessage={logInErrorMessage}
      />
    </section>
  );
};

export default LogInPage;
