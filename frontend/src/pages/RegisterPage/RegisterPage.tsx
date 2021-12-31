import { AxiosError } from "axios";
import * as React from "react";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import { useRegister } from "../../hooks/useRegister";
import { RegisterData } from "../../types";

const RegisterPage = () => {
  const [registerErrorMessage, setRegisterErrorMessage] = React.useState("");

  const postRegisterFail = (error: AxiosError) => {
    if (error?.response?.status === 400 || error?.response?.status === 401) {
      setRegisterErrorMessage(error?.response?.data.detail);
    } else {
      setRegisterErrorMessage("Something went wrong, please try again.");
    }
  };

  const { register } = useRegister(postRegisterFail);

  const handleRegister = (data: RegisterData) => {
    register(data);
  };

  return (
    <section className="register-page">
      <RegisterForm
        handleRegister={handleRegister}
        registerErrorMessage={registerErrorMessage}
      />
    </section>
  );
};

export default RegisterPage;
