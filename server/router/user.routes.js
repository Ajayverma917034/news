import express from 'express'
import { createUser, getUser, login } from '../controller/user.controller.js'
import { handleRefreshToken } from '../middleware/handleRefreshToken.js';
import { isAuthenticated } from '../middleware/Authentication.js';

const userRoute = express.Router()

userRoute.post('/sign-up', createUser);
userRoute.post('/sign-in', login)
userRoute.get('/me', isAuthenticated, getUser)

userRoute.get('/refresh-token', handleRefreshToken)

export default userRoute;