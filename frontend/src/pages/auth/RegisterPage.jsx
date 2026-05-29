import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faUser, faSpinner } from '@fortawesome/free-solid-svg-icons'
import FormContext from '../../contexts/FormContext'
import PasswordTracker from '../../components/auth/PasswordTracker'
import AuthLayout from '../../components/layouts/AuthLayout';

import useAuth from '../../hooks/useAuth';
import Input from '../../components/auth/Input';


const RegisterPage = () => {
  const { dispatch, ACTIONS, name, email, password } = useContext(FormContext);
  const { register, loading } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    await register({ name, email, password });
  }

  return (
    <AuthLayout
      title="Create Account"
      footer={<>Already have an account? <Link to='/login' className='main-link ml-2'>Login</Link></>}
    >
      <form className='flex flex-col' onSubmit={(e) => handleRegister(e)}>
        <Input
          icon={faUser}
          type="text" placeholder='Burak' value={name}
          onChange={(e) => dispatch({
            type: ACTIONS.CHANGE,
            field: "name",
            value: e.target.value
          })}
        />
        <Input
          icon={faEnvelope}
          type="email" placeholder='devburakor@gmail.com' value={email}
          onChange={(e) => dispatch({
            type: ACTIONS.CHANGE,
            field: "email",
            value: e.target.value
          })}
        />
        <Input
          icon={faLock}
          type="password" placeholder='password' value={password}
          onChange={(e) => dispatch({
            type: ACTIONS.CHANGE,
            field: "password",
            value: e.target.value
          })}
        />
        <PasswordTracker />
        <button type='submit' className='main-btn mt-5' disabled={loading}>
          {loading ? <FontAwesomeIcon icon={faSpinner} className='mx-auto animate-spin' /> : "Register"}
        </button>
      </form>
    </AuthLayout>
  )
}

export default RegisterPage