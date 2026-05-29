import { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import * as authService from '../service/authService'
import { toast } from 'react-hot-toast'
import AuthContext from '../contexts/AuthContext';

const useAuth = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { login: setAuthUser, logout: clearAuthUser, startLoading, stopLoading, loading } = useContext(AuthContext);

    const register = async (user) => {
        try {
            startLoading();
            const response = await authService.register(user);
            setAuthUser(response.data.user);
            toast.success(response.data.message || "Registered successfully!");
            navigate('/email-verify');
        } catch (error) {
            console.error({ message: "Error in register", error });
            toast.error(error.response?.data?.message || "Error in Signing up");
        } finally {
            stopLoading();
        }
    };

    const login = async (user) => {
        try {
            startLoading();
            const response = await authService.login(user.email, user.password);
            setAuthUser(response.data.user);
            toast.success(response.data.message || "Logged in successfully!");
            navigate('/email-verify');
        } catch (error) {
            console.error({ message: "Error in login", error });
            toast.error(error.response?.data?.message || "Error in logging in");
        } finally {
            stopLoading();
        }
    }

    const verify = async (code) => {
        try {
            startLoading();
            const response = await authService.verify2FA(code);
            toast.success(response.data.message || "Account verified successfully!");
            navigate('/');
        } catch (error) {
            console.error({ message: "Error in verify", error });
            toast.error(error.response?.data?.message || "Error in Verifying The Account");
        } finally {
            stopLoading();
        }
    }

    const logout = async () => {
        try {
            startLoading();
            const response = await authService.logout();
            clearAuthUser();
            toast.success(response.data.message || "Logged out successfully!");
            navigate('/login');
        } catch (error) {
            console.error({ message: "Error in logout Hook", error });
            toast.error(error.response?.data?.message || "Error in logging out");
        } finally {
            stopLoading();
        }
    }

    const deleteAccount = async () => {
        try {
            startLoading();
            const response = await authService.deleteAccount();
            clearAuthUser();
            toast.success(response.data.message || "Account deleted successfully!");
            navigate('/register');
        } catch (error) {
            console.error({ message: "Error in deleteAccount", error });
            toast.error(error.response?.data?.message || "Error in Deleting The Account");
        } finally {
            stopLoading();
        }
    }

    const forgotPassword = async (email) => {
        try {
            startLoading();
            const response = await authService.forgotPassword(email);
            toast.success(response.data.message || "Forgot password email sent!");
            return true;
        } catch (error) {
            console.error({ message: "Error in forgotPassword", error });
            toast.error(error.response?.data?.message || "Error in sending forgot password request");
            return false;
        } finally {
            stopLoading();
        }
    }

    const resetPassword = async ({ password }) => {
        try {
            const token = location.pathname.split("/").slice(-1).join('');
            startLoading();
            const response = await authService.resetPassword(password, token);
            toast.success(response.data.message || "Password reset successfully!");
            navigate('/login');
        } catch (error) {
            console.error({ message: "Error in resetPassword Hook", error });
            toast.error(error.response?.data?.message || "Error in resetting password of The Account");
        } finally {
            stopLoading();
        }
    }

    const checkAuth = async () => {
        try {
            startLoading();
            const response = await authService.checkAuth();
            toast.success(response.data.message);
            setAuthUser(response.data.user);
        } catch (error) {
            clearAuthUser();
            console.error({ error });
            toast.error(error?.response?.data?.message || "Error in checking authentication of The Account");
        } finally {
            stopLoading();
        }
    }

    const resendOTP = async () => {
        try {
            startLoading();
            const response = await authService.resendOTP();
            toast.success(response.data.message || "OTP resent successfully!");
        } catch (error) {
            clearAuthUser();
            console.error({ error });
            toast.error(error.response?.data?.message || "Error in generating OTP of The Account");
        } finally {
            stopLoading();
        }
    }

    return { register, login, verify, logout, deleteAccount, forgotPassword, resetPassword, checkAuth, resendOTP, loading };
}

export default useAuth;
