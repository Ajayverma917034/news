import express from 'express';
import { adminNews, createNews, deleteNews, fetchDataStateWise, fetchRelatedNews, findNewsSectionTypeNews, findStateDataWithOutDistrict, findStateNews, getBreakingNews, getHomeNews, getMyNews, getMyNewsCount, getNews, getNewsCount, getNewses } from '../controller/news.controller.js';
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

newsRouter.post('/fetch-state-news-without-district', findStateDataWithOutDistrict)

newsRouter.get('/breaking-news', getBreakingNews)

newsRouter.post('/get-my-news', isAuthenticated, authorizeroles("reporter"), getMyNews)
newsRouter.post('/get-my-news-count', isAuthenticated, authorizeroles("reporter"), getMyNewsCount)

export default newsRouter;