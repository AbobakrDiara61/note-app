import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import FormContext from '../../contexts/FormContext'
import useAuth from '../../hooks/useAuth'
import AuthLayout from '../../components/layouts/AuthLayout'
import Input from '../../components/auth/Input'


const LoginPage = () => {
  const { dispatch, ACTIONS, email, password } = useContext(FormContext);
  const { login, loading } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login({ email, password });
  }

  return (
    <AuthLayout
      title='Welcome Back'
      footer={<>Don't have an account? <Link to='/register' className='main-link ml-2'>Sign Up</Link></>}
    >
      <form className='flex flex-col' onSubmit={(e) => handleLogin(e)}>
        <Input
          icon={faEnvelope}
          type="email" placeholder='Email Address' value={email}
          onChange={(e) => dispatch({
            type: ACTIONS.CHANGE,
            field: "email",
            value: e.target.value
          })}
        />
        <Input
          icon={faLock}
          type="password" placeholder='Password' value={password}
          onChange={(e) => dispatch({
            type: ACTIONS.CHANGE,
            field: "password",
            value: e.target.value
          })}
        />

        <Link to='/forgot-password' className='text-emerald-500 hover:text-emerald-400 hover:underline underline-offset-2 transition-all mb-5'>Forget Password?</Link>
        <button type="submit" disabled={loading} className='main-btn'>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </AuthLayout>
  )
}

export default LoginPage