import { useState } from 'react'
import OTPCode from '../../components/auth/OTPCode'
import useAuth from '../../hooks/useAuth';
import { useEffect } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';

const EmailVerification = () => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const { verify, resendOTP, loading } = useAuth();

  const handleVerifying = async (e) => {
    e.preventDefault();
    await verify(otp.join(''));
  }

  useEffect(() => {

    if (otp.filter(digit => digit !== '').length === otp.length)
      handleVerifying(new Event('submit'));

  }, [otp]);
  return (
    <AuthLayout
      title='Verify Your Email'
      subtitle='Enter the 6-digit code sent to your email address'
      footer={`Didn't get the code? Check your spam folder`}
      wide={true}
    >
      <form className='flex flex-col' onSubmit={(e) => handleVerifying(e)}>
        <OTPCode {...{ otp, setOtp }} />
        <p className='text-sm text-center text-white/60 mt-2'>
          If you haven't received the code,
          <button type='button' disabled={loading} className="text-emerald-600 mx-1 my-2 hover:text-emerald-400 transition-all duration-200" onClick={async () => await resendOTP()}>
            click here to resend it.
          </button>
        </p>
        <button type="submit" disabled={loading} className='main-btn mb-0'>
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>
    </AuthLayout>
  )
}

export default EmailVerification