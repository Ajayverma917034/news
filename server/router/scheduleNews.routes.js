import express from 'express';
import { authorizeroles, isAuthenticated } from '../middleware/Authentication.js';
import { createScheduleNews, deleteScheduleNews, getMyScheduleNews, getMyScheduleNewsCount, getScheduleNews, publishScheduleNews } from '../controller/schedulenews.controller.js';
const scheduleNewsRouter = express.Router();
scheduleNewsRouter.post('/create-schedule-news', isAuthenticated, authorizeroles("reporter", "admin"), createScheduleNews);
scheduleNewsRouter.put('/publish-schedule-news', isAuthenticated, authorizeroles("reporter", "admin"), publishScheduleNews);
scheduleNewsRouter.post('/get-schedule-news', isAuthenticated, authorizeroles("reporter", "admin"), getScheduleNews);

scheduleNewsRouter.post('/get-my-schedule-news', isAuthenticated, authorizeroles("reporter", "admin"), getMyScheduleNews)

scheduleNewsRouter.post('/get-my-schedule-news-count', isAuthenticated, authorizeroles("reporter", "admin"), getMyScheduleNewsCount)

scheduleNewsRouter.delete('/delete-my-schedule-news/:id', isAuthenticated, authorizeroles("reporter", "admin"), deleteScheduleNews)

export default scheduleNewsRouter;