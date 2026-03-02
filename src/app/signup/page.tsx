'use client';
import { useState } from 'react';
import type { FormEvent } from 'react';
import Button from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';
import { AccountSignUp } from '@/actions/auth/signup';
import Link from 'next/link';

const Signup = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await AccountSignUp(formData);

    if (result?.errors) {
      setErrors(result.errors);
      setLoading(false);
    }
  };

  return (
    <div className="grid place-items-center -translate-y-32  px-8 sm:px-4 md:px-2 w-full">
      <div className="w-full sm:max-w-5/6 xl:max-w-1/2 2xl:max-w-1/3 lg:max-w-1/2 md:max-w-2/3 bg-white border-2 py-4 shadow-md border-gray-300 rounded-lg px-4">
        <h1 className="text-center pt-2 pb-4 font-bold text-2xl">Create Account</h1>
        <form onSubmit={handleSubmit} className="">
          <div className="flex w-full gap-4">
            <div className="w-full">
              <input
                type="text"
                name="firstname"
                placeholder="Firstname"
                autoComplete="none"
                className={`input-control ${errors?.firstname?.errors[0] && 'input-control-invalid'}`}
              />

              {errors?.firstname?.errors[0] && (
                <p className="input-group-error-text">{errors.firstname.errors[0]}</p>
              )}
            </div>
            <div className="w-full">
              <input
                type="text"
                name="lastname"
                placeholder="Lastname"
                autoComplete="none"
                className={`input-control ${errors?.lastname?.errors[0] && 'input-control-invalid'}`}
              />
              {errors?.lastname?.errors[0] && (
                <p className="input-group-error-text">{errors.lastname.errors[0]}</p>
              )}
            </div>
          </div>
          <div className="flex w-full place-content-center pt-4">
            <div className="input-group w-full">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                autoComplete="none"
                className={`input-control ${errors?.email?.errors[0] && 'input-control-invalid'}`}
              />
              {errors?.email?.errors[0] && (
                <p className="input-group-error-text">{errors.email.errors[0]}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col w-full place-items-center">
            <div className="flex w-full gap-4 pt-4">
              <input
                type="password"
                name="password"
                placeholder="Create Password"
                autoComplete="none"
                className={`input-control ${errors?.password?.errors[0] && 'input-control-invalid'}`}
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter Password"
                autoComplete="none"
                className={`input-control ${errors?.confirmPassword?.errors[0] && 'input-control-invalid'}`}
              />
            </div>
            {errors?.password?.errors[0] && (
              <p className="input-group-error-text">{errors.password.errors[0]}</p>
            )}
            {errors?.confirmPassword?.errors[0] && (
              <p className="input-group-error-text">{errors.confirmPassword.errors[0]}</p>
            )}
          </div>
          <div className="pt-6 flex gap-2.5 place-items-center flex-col">
            <Button disabled={loading} size={'sm'}>
              {loading ? (
                <>
                  <Spinner />
                  {'Creating...'}
                </>
              ) : (
                'Create Account'
              )}
            </Button>
            <span className="text-muted-foreground text-sm">
              Already Have an Account?{' '}
              <Link className="hover:underline" href="/signin">
                Sign In
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
