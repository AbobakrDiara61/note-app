import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import validator from 'validator'

const preferencesSchema = new mongoose.Schema(
    {
        theme: { type: String, enum: ['light', 'dark', 'system'], default: 'system' },
        language: { type: String, default: 'en' },
        defaultView: { type: String, enum: ['grid', 'list'], default: 'grid' },
        defaultContentType: {
            type: String,
            enum: ['text', 'markdown', 'jsx'],
            default: 'text',
        },
        notificationsEnabled: { type: Boolean, default: true },
    },
    { _id: false }
)

const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    refreshToken: {
        type: String,
        required: false,
        default: null
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    OTP: {
        type: String,
        default: null
    },
    OTPExpiry: {
        type: Date,
        default: null
    },
    resetPasswordToken: {
        type: String,
        default: null
    },
    resetPasswordTokenExpiresAt: {
        type: Date,
        default: null
    },
    lastLogin: {
        type: Date,
        default: null
    },
    preferences: preferencesSchema,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    bio: {
        type: String,
        maxLength: 100,
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        default: 'male'
    },
    socialAccounts: {
        linkedIn: { type: String, trim: true, default: null },
        twitter: { type: String, trim: true, default: null },
        github: { type: String, trim: true, default: null },
        portfolio: { type: String, trim: true, default: null }
    },
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/dzmnrmrvs/image/upload/v1770556156/370751043_e67eb556-f125-4e24-95ad-8aff21b9926a_ism2rl.svg'
    }
}, { timestamps: true })

userSchema.index({ email: 1 });
/** @type {import('mongoose').Model} */
const User = mongoose.model('User', userSchema);

export default User