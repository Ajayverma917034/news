export const sendToken = async (user, statusCode, res) => {
    try {
        const accessToken = await user.getAccessToken();
        const refreshToken = await user.getRefreshToken();


        user.refreshToken = refreshToken;
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
        res.cookie('refreshToken', refreshToken, refreshOptions);
        res.cookie('accessToken', accessToken, accessOptions);

        const userData = {
            username: user.username,
            profile: user.profile,
            role: user.role,
        }
        return res.status(statusCode).json({ success: true, userData, accessToken, refreshToken })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}