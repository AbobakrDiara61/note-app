import jwt from 'jsonwebtoken';

const createToken = (payload) => {
    // return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '10s' });
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET);
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '3d' });
}

const setCookie = (res, cookieValue, fieldName, maxAge = 3 * 24 * 60 * 60 * 1000) => {
    res.cookie(fieldName, cookieValue, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge
    })
}

const generateOTP = () => {
    const OTP = Math.floor(100000 + 900000 * Math.random());
    const OTPExpiry = Date.now() + 3 * 60 * 1000;
    return { OTP, OTPExpiry };
}

export { createToken, createRefreshToken, setCookie, generateOTP };
