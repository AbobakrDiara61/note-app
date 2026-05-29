import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faArrowLeft, faSpinner } from '@fortawesome/free-solid-svg-icons'
import FormContext from '../../contexts/FormContext'
import useAuth from '../../hooks/useAuth';
import Input from '../../components/auth/Input';
import AuthLayout from '../../components/layouts/AuthLayout';



const ForgotPasswordPage = () => {
  const { dispatch, ACTIONS, email } = useContext(FormContext);
  const [ submitted, setSubmitted ] = useState(false);
  const [ sent, setSent ] = useState(false);
  const { forgotPassword, loading } = useAuth();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await forgotPassword(email);
      if (res) {
        setSent(true);
      }
    } catch (error) {
      setSent(false);
      console.log("eee")
    }
    setSubmitted(true);
  }

  return (
    <AuthLayout
      title='Forgot Password'
      subtitle={`Enter your email address and we'll send you a link to reset your password.`}
      footer={<>
        <Link to='/login' className='main-link ml-2 flex items-center justify-center gap-2'><FontAwesomeIcon icon={faArrowLeft} className='text-emerald-600 size-4'/> Back to Login</Link>
      </>}
    >
      { !submitted ? (
        <form className='flex flex-col' onSubmit={(e) => handleForgotPassword(e)}>
        <Input
          icon={faEnvelope}
          type="email" placeholder='Email Address' value={email} 
          onChange={(e) => dispatch({
              type: ACTIONS.CHANGE,
              field: "email",
              value: e.target.value
            })}
          />
          <button type="submit" disabled={loading} className='main-btn flex justify-center items-center mt-0'>
            {loading ? <><FontAwesomeIcon icon={faSpinner} className='animate-spin mr-2' /> Sending... </> : "Send Reset Link"}
          </button>
        </form> 
      ) : (
        <div className="flex flex-col items-center animate-fade-in text-white text-sm text-center">
              <div className={`size-12 mb-2 rounded-full ${sent ? "bg-emerald-500" : "bg-red-500"} inline-flex items-center justify-center`}>
                <FontAwesomeIcon icon={faEnvelope} className='size-6 text-white'/>
              </div>
              {sent ? <>Check your email: <span className='text-emerald-500'>{email}</span> for a reset link</> : <>
              <p>Email: <span className='text-slate-300'>{email}</span> not found</p>
              <button onClick={() => setSubmitted(false)} className='main-btn py-1'>Try Again</button>
              </>}
        </div>
      )}
    </AuthLayout>
  )
}

export default ForgotPasswordPage;