import express from 'express';
import { adminNews, createNews, deleteDraftNews, deleteNews, fetchDataStateWise, fetchRelatedNews, findNewsSectionTypeNews, findStateDataWithOutDistrict, findStateNews, getBreakingNews, getHomeNews, getMyNews, getMyNewsCount, getNews, getNewsCount, getNewses, searchNews } from '../controller/news.controller.js';
import { authorizeroles, isAuthenticated } from '../middleware/Authentication.js';
import { deleteNewsAdmin } from '../controller/admin.controller.js';

const newsRouter = express.Router();

newsRouter.post('/create-news', isAuthenticated, authorizeroles("reporter", "admin"), createNews);
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

newsRouter.post('/fetch-state-news-without-districts', findStateDataWithOutDistrict)

newsRouter.post('/search-news', searchNews)
// newsRouter.get('/breaking-news', getBreakingNews)

newsRouter.post('/get-my-news', isAuthenticated, authorizeroles("reporter", "admin"), getMyNews)
newsRouter.post('/get-my-news-count', isAuthenticated, authorizeroles("reporter", "admin"), getMyNewsCount)
newsRouter.delete('/delete-my-news/:id', isAuthenticated, authorizeroles("reporter"), deleteDraftNews)

export default newsRouter;