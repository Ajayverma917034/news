import express from 'express';
import { adminNews, createNews, deleteNews, fetchDataStateWise, fetchRelatedNews, findNewsSectionTypeNews, findStateNews, getBreakingNews, getHomeNews, getNews, getNewsCount, getNewses } from '../controller/news.controller.js';
import { authorizeroles, isAuthenticated } from '../middleware/Authentication.js';

const newsRouter = express.Router();

newsRouter.post('/create-news', isAuthenticated, authorizeroles("reporter"), createNews);
newsRouter.post('/get-news-query', getNewses)
newsRouter.post('/news/home', getHomeNews)
newsRouter.post('/get-news', getNews)
newsRouter.post('/all-latest-news-count', getNewsCount)
newsRouter.delete('/delete-news', isAuthenticated, authorizeroles("reporter"), deleteNews)
newsRouter.post('/admin-news', adminNews)
newsRouter.post('/fetch-related-news', fetchRelatedNews)

newsRouter.post("/fetch-state-news", fetchDataStateWise)
newsRouter.get("/fetch-all-state-news", findStateNews)
newsRouter.post('/fetch-sidebar-news', findNewsSectionTypeNews)

newsRouter.get('/breaking-news', getBreakingNews)

export default newsRouter;