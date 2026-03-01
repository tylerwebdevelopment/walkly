'use client';
import { useState } from 'react';
import type { FormEvent } from 'react';
import clsx from 'clsx';
import styles from './Signup.module.css';
import Button from '@/components/Button';
import { AccountSignUp } from '@/actions/auth/signup';

const Signup = () => {
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [errors, setErrors] = useState<any>({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const result = await AccountSignUp(formData);

    if (result?.errors) {
      setErrors(result.errors);
    }
  };

  return (
    <div className={clsx(styles['SignupContainer'])}>
      <h1 className={clsx(styles['SignupHeading'])}>Create Account</h1>
      <form onSubmit={handleSubmit} className={clsx(styles['SignupForm'])}>
        <div className="flex flex-row">
          <div className="input-group">
            <input
              type="text"
              name="firstname"
              placeholder="Firstname"
              autoComplete="none"
              className="input-control"
            />

            {errors?.firstname?.errors[0] && <p>{errors.firstname.errors[0]}</p>}
          </div>
          <div className="input-group">
            <input
              type="text"
              name="lastname"
              placeholder="Lastname"
              autoComplete="none"
              className="input-control"
            />
            {errors?.lastname?.errors[0] && <p>{errors.lastname.errors[0]}</p>}
          </div>
        </div>
        <div className="flex flex-row">
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              autoComplete="none"
              className="input-control"
            />
            {errors?.email?.errors[0] && <p>{errors.email.errors[0]}</p>}
          </div>
        </div>
        <div className="flex flex-row">
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Create Password"
              autoComplete="none"
              className="input-control"
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter Password"
              autoComplete="none"
              className="input-control"
            />
            {errors?.confirmPassword?.errors[0] && <p>{errors.confirmPassword.errors[0]}</p>}
            {errors?.password?.errors[0] && <p>{errors.password.errors[0]}</p>}
          </div>
        </div>
        <div className="flex justify-center w-full flex-row">
          <Button type="submit">Create Account</Button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
