import express from 'express';
import { authorizeroles, isAuthenticated } from '../middleware/Authentication.js';
import { getNews12MonthAnalytics, getNews1MonthAnalytics, getNewsMonthlyClickAnalytics, getNewsViewCountToday, getNewsYearlyClickAnalytics, getYtVideos12MonthAnalytics, getYtVideos1MonthAnalytics } from '../controller/analytics.controller.js';

const analyticsRouter = express.Router();
analyticsRouter.get('/get-news-today-view', isAuthenticated, getNewsViewCountToday)
analyticsRouter.post('/get-news-analytics-year', isAuthenticated, getNews12MonthAnalytics)
analyticsRouter.post('/get-news-analytics-month', isAuthenticated, getNews1MonthAnalytics)
analyticsRouter.post('/get-yt-news-analytics-year', isAuthenticated, getYtVideos12MonthAnalytics)
analyticsRouter.post('/get-yt-news-analytics-month', isAuthenticated, getYtVideos1MonthAnalytics)


analyticsRouter.post('/news-view-analytics-year', isAuthenticated, getNewsYearlyClickAnalytics)
analyticsRouter.post('/new-view-analytics-month', isAuthenticated, getNewsMonthlyClickAnalytics)
export default analyticsRouter;