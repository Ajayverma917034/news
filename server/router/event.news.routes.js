import express from 'express';
import { authorizeroles, isAuthenticated } from '../middleware/Authentication.js';
import { createNews, deleteNews, fetchRandomNews, getMyNews, getMyNewsCount, getNews, getNewsCount, getNewses } from '../controller/event-news.controller.js';


const eventNewsRouter = express.Router();

eventNewsRouter.post('/create-event-news', isAuthenticated, authorizeroles("admin", "reporter"), createNews);
eventNewsRouter.post('/get-event-news-query', getNewses)
eventNewsRouter.post('/get-event-news', getNews)
eventNewsRouter.post('/all-event-latest-news-count', getNewsCount)
eventNewsRouter.delete('/admin/delete-event-news/:id', isAuthenticated, authorizeroles("admin"), deleteNews)

eventNewsRouter.post('/get-random-event-news', fetchRandomNews)


eventNewsRouter.post('/get-my-event-news', isAuthenticated, authorizeroles("reporter", "admin"), getMyNews)
eventNewsRouter.post('/get-my-event-news-count', isAuthenticated, authorizeroles("reporter", "admin"), getMyNewsCount)

export default eventNewsRouter;