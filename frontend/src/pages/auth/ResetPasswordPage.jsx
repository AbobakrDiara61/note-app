import { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-hot-toast';
import FormContext from '../../contexts/FormContext'
import PasswordTracker from '../../components/auth/PasswordTracker'
import useAuth from '../../hooks/useAuth';
import AuthLayout from '../../components/layouts/AuthLayout';
import Input from '../../components/auth/Input';


const ResetPasswordPage = () => {
  const { dispatch, ACTIONS, password } = useContext(FormContext);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { resetPassword, loading } = useAuth();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      toast.error("Passwords do not match");
      return;
    }
    await resetPassword({ password });
  }

  return (
    <AuthLayout
      title='Reset Password'
      footer={<>Remember your password? <Link to='/login' className='main-link ml-2'>Back to Login</Link></>}
    >
      <form className='flex flex-col' onSubmit={(e) => handleResetPassword(e)}>
        <Input
          icon={faLock}
          type="password" placeholder='New Password' value={password}
          onChange={(e) => dispatch({
            type: ACTIONS.CHANGE,
            field: "password",
            value: e.target.value
          })}
        />
        <Input
          icon={faLock}
          type="password" placeholder='Confirm New Password' value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <PasswordTracker />
        <button type="submit" disabled={loading} className='main-btn mt-5'>
          {loading ? "Reseting..." : "Set New Password"}
        </button>
      </form>
    </AuthLayout>
  )
}

export default ResetPasswordPage