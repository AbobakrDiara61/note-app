import api from "./api";

const register = async (user) => api.post('/auth/register', user);
const login = async (email, password) => api.post('/auth/login', { email, password });
const logout = async () => api.post('/auth/logout');
const deleteAccount = async () => api.delete('/auth/account-deletion');
const verify2FA = async (code) => api.post('/auth/verify', { code });
const forgotPassword = async (email) => api.post('/auth/forgot-password', { email });
const resetPassword = async (password, token) => api.post('/auth/reset-password', { password, token });
const resendOTP = async () => api.post('/auth/resend-otp');
const checkAuth = async () => api.get('/auth/check-auth');

export {
    register,
    login,
    logout,
    deleteAccount,
    verify2FA,
    forgotPassword,
    resetPassword,
    resendOTP,
    checkAuth
};