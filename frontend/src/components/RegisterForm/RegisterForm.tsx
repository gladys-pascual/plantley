import * as React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { RegisterData } from "../../types";
import "../../lib/shared/logInAndRegisterForm.css";

type RegisterFormProps = {
  handleRegister: (data: RegisterData) => void;
  registerErrorMessage: string;
};

const RegisterForm = ({
  handleRegister,
  registerErrorMessage,
}: RegisterFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data: RegisterData) => {
    handleRegister(data);
  };

  return (
    <div className="form-wrapper">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Sign Up</h1>
        <section className="register">
          <input
            id="email"
            aria-invalid={errors.email ? "true" : "false"}
            {...register("email", {
              required: "This is required.",
              maxLength: 20,
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Value does not match email format.",
              },
            })}
            type="email"
            placeholder="Email"
          />
          <div className="error-message-container">
            <p
              className={
                errors.username
                  ? "error-message"
                  : "error-message-hidden error-message"
              }
              role="alert"
            >
              {errors.username && errors.username.message}
            </p>
          </div>
          <input
            id="name"
            aria-invalid={errors.name ? "true" : "false"}
            {...register("name", {
              required: "This is required.",
              minLength: {
                value: 3,
                message: "Minimum length is 3 characters.",
              },
            })}
            type="text"
            placeholder="Full Name"
          />
          <div className="error-message-container">
            <p
              className={
                errors.name
                  ? "error-message"
                  : "error-message-hidden error-message"
              }
              role="alert"
            >
              {errors.name && errors.name.message}
            </p>
          </div>

          <input
            id="password"
            aria-invalid={errors.passward ? "true" : "false"}
            {...register("password", {
              required: "This is required.",
              minLength: {
                value: 5,
                message: "Minimum length is 5 characters.",
              },
            })}
            type="password"
            placeholder="Password"
          />
          <div className="error-message-container">
            <p
              className={
                errors.password
                  ? "error-message"
                  : "error-message-hidden error-message"
              }
              role="alert"
            >
              {errors.password && errors.password.message}
            </p>
          </div>
        </section>
        <button type="submit" className="submit">
          SUBMIT
        </button>

        {registerErrorMessage && (
          <p className="incorrect-details">{registerErrorMessage}</p>
        )}
      </form>
    </div>
  );
};

export default RegisterForm;
