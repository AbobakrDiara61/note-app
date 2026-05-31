import { useContext, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Create from "./pages/Create"
import EditNote from "./pages/EditNote"

import Loading from "./components/Loading";
import RedirectHome from "./router/RedirectHome";
import ProtectedRoute from "./router/ProtectedRoute";
import Role from "./router/Role";

import FormProvider from "./contexts/FormProvider";
import AuthContext from "./contexts/AuthContext"

import useAuth from "./hooks/useAuth"

import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from './pages/auth/LoginPage'
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import EmailVerification from "./pages/auth/EmailVerification";

import AdminDashboard from "./pages/admin/AdminDashboard"

function App() {
  const { checkAuth } = useAuth();
  const { loading } = useContext(AuthContext);

  useEffect(() => {
    const onLoad = async () => await checkAuth();
    onLoad();
  }, [])

  if (loading) return <section className="w-full h-screen bg-black"><Loading /></section>;
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<Create />} />
          <Route path='/edit' element={<EditNote />} />
          <Route element={<Role roles={["admin"]} />}>
            <Route path="/dashboard" element={<AdminDashboard />} />
          </Route>
        </Route>

        <Route element={<FormProvider><RedirectHome /></FormProvider>} >
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="/email-verify" element={<EmailVerification />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
