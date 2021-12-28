import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { LogInData } from "../../types";
// import "../../assets/logInAndSignUpForm.scss";

type LogInFormProps = {
  handleLogIn: (data: LogInData) => void;
  isLogInError: boolean;
  logInErrorMessage: string;
};

const LogInForm = ({
  handleLogIn,
  isLogInError,
  logInErrorMessage,
}: LogInFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data: LogInData) => {
    handleLogIn(data);
  };

  console.log(`isLogInError`, isLogInError);

  console.log(`logInErrorMessage`, logInErrorMessage);

  return (
    <div className="form-wrapper">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Login</h1>
        <section className="log-in">
          <input
            id="username"
            aria-invalid={errors.email ? "true" : "false"}
            {...register("username", {
              required: "This is required.",
              maxLength: 20,
              pattern: /\S+@\S+\.\S+/,
            })}
            // ref={register({
            //   required: "This is required.",
            //   pattern: {
            //     value: /\S+@\S+\.\S+/,
            //     message: "Entered value does not match email format.",
            //   },
            // })}
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
            id="password"
            aria-invalid={errors.passward ? "true" : "false"}
            {...register("password", {
              required: "This is required.",
              maxLength: 20,
            })}
            // ref={register({
            //   required: "This is required.",
            //   minLength: {
            //     value: 5,
            //     message: "Minimum length is 5 characters.",
            //   },
            // })}
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

        {isLogInError && (
          <p className="incorrect-details">{logInErrorMessage}</p>
        )}
      </form>
      <p className="register">
        Don't have an account? <Link to="/signup">Register</Link>
      </p>
    </div>
  );
};

export default LogInForm;
