'use client';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { Button } from '@/component';
import { AccountSignIn } from '@/actions/auth/signin';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
    <div className=''>
      <h1 className=''>Sign In</h1>
      <form onSubmit={handleSubmit} className=''>
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
        <div className="flex justify-center flex-col w-full">
          <Button type="submit">Continue</Button>
          <Link href="/forgot-password" className='text-center'>Forgot Password?</Link>
          <Link href="/signup" className='text-center'>Don&apos;t have an account? Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
