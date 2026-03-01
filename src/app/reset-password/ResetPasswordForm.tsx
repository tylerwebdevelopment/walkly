'use client';
import { AccountResetPassword } from '@/actions/auth/reset-password';
import Button from '@/component/Button';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import type { FormEvent } from 'react';


const SubmitButton = ({disableButton, loading} : {disableButton: boolean, loading: boolean}) => {
  return (
    <Button type='submit' disabled={loading || disableButton}>{loading ? 'Resetting....' : 'Reset Password'}</Button>
  )
}

// type ResetPasswordErrors = {
//   password?: string[];
//   confirmPassword?: string[];
//   token?: string[];
// }

// type ResetPasswordState = {
//   errors: ResetPasswordErrors;
// }



const ResetPasswordForm = ({
  token,
}: {
  token: string;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [errors, setErrors] = useState<any>({});
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await AccountResetPassword(formData);

    if(result?.errors){
      setErrors(result.errors)
      setLoading(false);
      return;
    }
    setErrors(null);

    if(result?.success){
      setDisableButton(true);
      setLoading(false);
      redirect('/signin');
    }
  }
  return (
    <form onSubmit={handleResetPassword}>
      <input type="hidden" name="token" value={token} />
      <input
        type="password"
        autoComplete="none"
        className="input-control"
        placeholder="New Password"
        name="password"
        required
      />
      {
        errors?.password?.errors[0] && (
          <p>{errors.password.errors[0]}</p>
        )
      }
      <input
        type="password"
        autoComplete="none"
        className="input-control"
        placeholder="Re-enter Password"
        name="confirmPassword"
        required
      />
      {
        errors?.confirmPassword?.errors[0] && (
          <p>{errors.confirmPassword.errors[0]}</p>
        )
      }
      {
        errors?.token?.errors && (
          <p>{errors.token.errors[0]}</p>
        )
      }
      <SubmitButton loading={loading} disableButton={disableButton} />
    </form>
  );
};



export default ResetPasswordForm;
