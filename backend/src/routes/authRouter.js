import express from "express";
import { 
    register, 
    login, 
    logout, 
    deleteAccount, 
    resendOTP, 
    verifyOTP, 
    forgotPassword, 
    resetPassword, 
    checkAuthentication, 
    refresh,   
} from "../controllers/authController.js";
import authentication from "../middlewares/authentication.js";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authentication, logout);
router.delete('/account-deletion', authentication, deleteAccount);
router.post('/verify', authentication, verifyOTP);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/check-auth', authentication, checkAuthentication);
router.post('/resend-otp', authentication, resendOTP);
router.post('/refresh', refresh);

export default router