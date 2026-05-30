import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import validator from 'validator'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
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
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {timestamps: true})

userSchema.statics.signUp = async function (user) {
    const { email, password } = user;
    validate(user);
    const isEmailExits = await this.findOne({ email });
    if(isEmailExits) 
        throw Object.assign(new Error("Email Already Exists"), { status: 400 });
    const hashdPassword = await bcrypt.hash(password, 10);

    const newUser = await this.create({ ...user, password: hashdPassword });
    return newUser; 
}

userSchema.statics.login = async function (user) {
    const { email, password } = user;
    const userModel = await this.findOne({ email });
    switch(true) {
        case !email || !password:
            throw Object.assign(new Error("All Fields Must be Filled"), { status: 400 });
        case !userModel:
            throw Object.assign(new Error("User Not Found"), { status: 404 });
    }
    const isMatched = await bcrypt.compare(password, userModel.password);
    if(!isMatched)
        throw Object.assign(new Error("Invalid Password"), { status: 401 });
    return userModel;
}

function validate (user) {
    const {name, email, password} = user;
    switch(true) {
        case !name || !email || !password:
            throw Object.assign(new Error("All Fields Must be Filled"), { status: 400 });
        case !validator.isEmail(email):
            throw Object.assign(new Error("Email is not valid"), { status: 400 });
        case !validator.isStrongPassword(password):
            throw Object.assign(new Error("Password is not strong enough"), { status: 400 });
        default:
            return;
    }
}
/** @type {import('mongoose').Model} */
const User = mongoose.model('User', userSchema);

export default User