import * as React from 'react';
import LogInForm from '../../components/LogInForm/LogInForm';
import { LogInData } from '../../types';
import { useLogIn } from '../../hooks/useLogIn';
import { AxiosError } from 'axios';
import '../../lib/shared/logInAndRegisterForm.css';

const LogInPage = () => {
  const [logInErrorMessage, setLogInErrorMessage] = React.useState('');

  const postLogInFail = (error: AxiosError) => {
    if (error?.response?.status === 401) {
      setLogInErrorMessage(error?.response?.data.detail);
    } else {
      setLogInErrorMessage('Something went wrong, please try again.');
    }
  };

  const { logIn } = useLogIn(postLogInFail);

  const handleLogIn = (data: LogInData) => {
    logIn(data);
  };

  return (
    <section className="log-in-page">
      <LogInForm
        handleLogIn={handleLogIn}
        logInErrorMessage={logInErrorMessage}
      />
    </section>
  );
};

export default LogInPage;
