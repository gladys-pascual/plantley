import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { RegisterData, UserProfileResponse } from '../../types';
import './UserProfileUpdateForm.css';

type UserProfileUpdateFormProps = {
  userProfile: UserProfileResponse;
  handleUserProfileUpdate: (data: RegisterData) => void;
  updateUserProfileErrorMessage: string;
};

const UserProfileUpdateForm = ({
  userProfile,
  handleUserProfileUpdate,
  updateUserProfileErrorMessage,
}: UserProfileUpdateFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (data: RegisterData) => {
    handleUserProfileUpdate(data);
  };

  return (
    <div className="user-update-form-wrapper">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <section className="register">
          <label htmlFor="email" className="label">
            Email Address
          </label>
          <input
            id="email"
            aria-invalid={errors.email ? 'true' : 'false'}
            {...register('email', {
              required: 'This is required.',
              maxLength: 20,
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Value does not match email format.',
              },
              value: userProfile?.username,
            })}
            type="email"
          />
          <div className="error-message-container">
            <p
              className={
                errors.email
                  ? 'error-message'
                  : 'error-message-hidden error-message'
              }
              role="alert"
            >
              {errors.email && errors.email.message}
            </p>
          </div>
          <label htmlFor="name" className="label">
            Full Name
          </label>
          <input
            id="name"
            aria-invalid={errors.name ? 'true' : 'false'}
            {...register('name', {
              required: 'This is required.',
              minLength: {
                value: 3,
                message: 'Minimum length is 3 characters.',
              },
              value: userProfile?.name,
            })}
            type="text"
          />
          <div className="error-message-container">
            <p
              className={
                errors.name
                  ? 'error-message'
                  : 'error-message-hidden error-message'
              }
              role="alert"
            >
              {errors.name && errors.name.message}
            </p>
          </div>
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            id="password"
            aria-invalid={errors.passward ? 'true' : 'false'}
            {...register('password', {
              minLength: {
                value: 5,
                message: 'Minimum length is 5 characters.',
              },
            })}
            type="password"
            placeholder="Password"
          />
          <div className="error-message-container">
            <p
              className={
                errors.password
                  ? 'error-message'
                  : 'error-message-hidden error-message'
              }
              role="alert"
            >
              {errors.password && errors.password.message}
            </p>
          </div>
        </section>
        <div className="update-details-buttons">
          <Link to="/users/profile" className="cancel-update">
            CANCEL
          </Link>
          <button type="submit" className="submit-update">
            SUBMIT
          </button>
        </div>

        {updateUserProfileErrorMessage && (
          <p className="incorrect-details">{updateUserProfileErrorMessage}</p>
        )}
      </form>
    </div>
  );
};

export default UserProfileUpdateForm;
