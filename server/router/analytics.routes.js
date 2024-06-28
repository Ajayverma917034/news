import express from 'express';
import { authorizeroles, isAuthenticated } from '../middleware/Authentication.js';
import { getNews12MonthAnalytics, getNews1MonthAnalytics, getNewsViewCountToday, getYtVideos12MonthAnalytics, getYtVideos1MonthAnalytics } from '../controller/analytics.controller.js';

const analyticsRouter = express.Router();
analyticsRouter.get('/get-news-today-view', isAuthenticated, authorizeroles("admin"), getNewsViewCountToday)
analyticsRouter.post('/get-news-analytics-year', isAuthenticated, authorizeroles("admin"), getNews12MonthAnalytics)
analyticsRouter.post('/get-news-analytics-month', isAuthenticated, authorizeroles("admin"), getNews1MonthAnalytics)
analyticsRouter.post('/get-yt-news-analytics-year', isAuthenticated, authorizeroles("admin"), getYtVideos12MonthAnalytics)
analyticsRouter.post('/get-yt-news-analytics-month', isAuthenticated, authorizeroles("admin"), getYtVideos1MonthAnalytics)
export default analyticsRouter;