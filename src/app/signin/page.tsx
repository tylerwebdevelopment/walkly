'use client';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { Button } from '@/components';
import styles from './SignIn.module.css';
import clsx from 'clsx';
import { AccountSignIn } from '@/actions/auth/signin';
import { useRouter } from 'next/navigation';

const SignIn = () => {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [errors, setErrors] = useState<any>({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const result = await AccountSignIn(formData);

    if (result?.errors) {
      setErrors(result.errors);
      return;
    }

    if (result.success) {
      router.push('/dashboard');
    }
  };

  return (
    <div className={clsx(styles['SignInContainer'])}>
      <h1 className={clsx(styles['SignInHeading'])}>Sign In</h1>
      <form onSubmit={handleSubmit} className={clsx(styles['SignInForm'])}>
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
              placeholder="Enter Password"
              autoComplete="none"
              className="input-control"
            />
            {errors?.password?.errors[0] && <p>{errors.password.errors[0]}</p>}
          </div>
        </div>
        <div className="flex justify-center w-full flex-row">
          <Button type="submit">Continue</Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
