import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
        maxLength: [30, "Your username cannot exceed 30 characters"],
        minLength: [3, "Your username must be at least 4 characters long"],
    },
    fullName: {
        type: String,
        default: '',
        maxLength: [30, "Your Full Name cannot exceed 30 characters"],
    },
    profile: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
        validate: [validator.isEmail, 'Please provide a valid email address']
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minLength: [5, "Your password must be at least 5 characters long"],
        select: false
    },
    role: {
        type: String,
        enum: {
            values: ['reporter', 'admin'],
            message: 'Please select correct role'
        },
        default: 'reporter'
    },
    account_info: {
        total_news: {
            type: Number,
            default: 0,
        },
    },
    news: {
        type: [Schema.Types.ObjectId],
        required: true,
        ref: 'User'
    },
    refreshToken: {
        type: String,
        default: ''
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, { timestamps: true })


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// get access token
userSchema.methods.getAccessToken = async function () {
    return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRES })
}

// get refresh token
userSchema.methods.getRefreshToken = async function () {
    return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES
    })
}

// get reset password token
userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex');

    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
}
const User = mongoose.model('User', userSchema)

export default User