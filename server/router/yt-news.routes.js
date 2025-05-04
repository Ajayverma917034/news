

import express from "express";

import { createYtNews, deleteYtNews, fetchRelatedNews, getMyNewsCountYt, getMyNewsYt, getVideoNews, getYtNews, getYtNewsCount, getYtNewses } from '../controller/yt-news.controller.js'
import { authorizeroles, isAuthenticated } from "../middleware/Authentication.js";

const YtRouter = express.Router();

YtRouter.post('/create-yt-news', isAuthenticated, authorizeroles('admin'), createYtNews)
YtRouter.post('/news/youtube', getYtNewses)
YtRouter.get('/news/video-news', getVideoNews)
YtRouter.post('/get-youtube-news', getYtNews)
YtRouter.post('/get-yt-news-count', getYtNewsCount)

YtRouter.post('/get-my-news-yt', isAuthenticated, authorizeroles("admin"), getMyNewsYt)
YtRouter.post('/get-my-news-count-yt', isAuthenticated, authorizeroles("admin"), getMyNewsCountYt)
YtRouter.delete('/admin/delete-news-yt/:id', isAuthenticated, authorizeroles("admin"), deleteYtNews)

YtRouter.post('/fetch-related-yt-news', fetchRelatedNews)

export default YtRouter;