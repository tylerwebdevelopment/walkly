'use client';
import { AccountForgotPassword } from '@/actions/auth/forgot-password';
import Button from '@/components/Button';
import { useState } from 'react';
import type { FormEvent } from 'react';

const ForgotPasswordPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [successfulSend, setSuccessfulSend] = useState<boolean>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await AccountForgotPassword(formData);

    if (result?.errors) {
      setErrors(result.errors);
      setLoading(false);
      return;
    }
    setErrors(null);

    if (result.success) {
      setErrors(null);
      setSuccessMessage('Email Sent');
      setSuccessfulSend(true);
      setLoading(false);
    }
  };
  return (
    <div>
      <h2>Forgot Password?</h2>
      <p>
        Please enter your email address associated with your account to recieve a password reset
        link
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          autoComplete="none"
          placeholder="Enter Email Address"
          className="input-control"
        />
        {errors?.email?.errors[0] && <p>{errors.email.errors[0]}</p>}
        <Button type="submit" disabled={loading || successfulSend}>
          {successMessage ? successMessage : 'Send Reset Link'}
        </Button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
