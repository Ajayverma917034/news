import tryCatch from "../utils/asyncFunction.js";
import User from '../model/user.model.js'
import jwt from 'jsonwebtoken'
export const handleRefreshToken = tryCatch(async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken || req.headers?.refreshtoken;
    // console.log(refreshToken)
    if (!refreshToken || Object.getPrototypeOf(refreshToken) === null) {
        return res.status(400).json({ success: false, message: 'Invalid refresh Token' });
    }
    // verify user 
    try {
        const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        if (!decodedRefreshToken) {
            return res.status(400).json({ success: false, message: 'Invalid refresh Token' })
        }
        // console.log(decodedRefreshToken)
        const user = await User.findOne({ _id: decodedRefreshToken.id });
        // console.log(user)
        // console.log(user)

        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid refresh Token' })
        }

        if (user.refreshToken !== refreshToken) {
            return res.status(400).json({ success: false, message: 'Invalid refresh Token' })
        }

        const accessToken = await user.getAccessToken();
        const newRefreshToken = await user.getRefreshToken();

        user.refreshToken = newRefreshToken;
        await user.save({ validateBeforeSave: false });

        const options = {
            httpOnly: true,
            secure: true,
        }

        const accessOptions = {
            ...options,
            maxAge: process.env.ACCESS_COOKIE_EXPIRES * 60 * 1000
        }
        const refreshOptions = {
            ...options,
            maxAge: process.env.REFRESH_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
        }

        res.cookie('refreshToken', newRefreshToken, refreshOptions);
        res.cookie('accessToken', accessToken, accessOptions);

        return res.status(200).json({ success: true, accessToken, refreshToken: newRefreshToken })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })

    }
})