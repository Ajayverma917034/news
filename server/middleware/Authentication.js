import User from "../model/user.model.js";
import tryCatch from "../utils/asyncFunction.js";
import ErrorHandler from "../utils/errorHandler.js";
import jwt from 'jsonwebtoken';

export const isAuthenticated = tryCatch(async (req, res, next) => {
    try {
        // console.log(req)
        const accessToken = req.cookies?.accessToken || req.headers['authorization']?.split(' ')[1];
        // console.log(req.cookies)

        if (!accessToken || Object.getPrototypeOf(accessToken) === null) {
            return next(new ErrorHandler(401, 'Unauthorized request'));
        }

        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

        if (!decodedToken) {
            return next(new ErrorHandler(401, 'Unauthorized request'));
        }

        const user = await User.findById(decodedToken.id).select("username email role refreshToken");

        if (!user) {
            return next(new ErrorHandler(401, 'Unauthorized request'));
        }

        req.user = user;
        next();

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
})

export const authorizeroles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(`Role : ${req.user.role} is not allowed to access this resource`, 403))
        }
        next();
    }
}

