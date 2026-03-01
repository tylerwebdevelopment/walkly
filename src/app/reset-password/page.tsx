import { redirect } from 'next/navigation';
import ResetPasswordForm from './ResetPasswordForm';
import { AccountResetPassword } from '@/actions/auth/reset-password';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ResetPasswordPage = async ({ searchParams }: { searchParams: URLSearchParams | any }) => {
  const params = await searchParams;

  const token = params.token;

  if (!token) {
    redirect('/forgot-password');
  }
  return (
    <div>
      <h2>Reset Password</h2>
      <ResetPasswordForm token={token} />
    </div>
  );
};

export default ResetPasswordPage;
