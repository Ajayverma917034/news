import express from 'express'
import { getMyNews } from '../controller/dashboard.controller.js'
import { isAuthenticated } from '../middleware/Authentication.js'
const DashboardNewsRoutes = express.Router()

DashboardNewsRoutes.post('/get-my-news',isAuthenticated, getMyNews)

export default DashboardNewsRoutes