'use client';

import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { useEffect, useState } from 'react';
import Button from '@/components/Button';

const VerifyEmailPage = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user.emailVerified) {
      router.replace('/dashboard');
    }
  }, [session, router]);

  const handleVerificationResend = async () => {
    if (!session) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await authClient.sendVerificationEmail({
        email: session.user.email,
        callbackURL: '/dashboard',
      });
      setSuccess(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Something Went Wrong. Please Try Again Later');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h1>Please Verify Your Email To get Access To Your Dashboard</h1>
      <p>Please check your inbox and click the verification link to acivate your account</p>
      <Button disabled={loading} onClick={() => handleVerificationResend()}>
        {loading ? 'Sending Email...' : 'Resend Email'}
      </Button>
      {success && <p>Email Sent!</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default VerifyEmailPage;
