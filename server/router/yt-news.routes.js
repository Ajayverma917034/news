

import express from "express";

import { createYtNews, getMyNewsCountYt, getMyNewsYt, getYtNews, getYtNewses } from '../controller/yt-news.controller.js'
import { authorizeroles, isAuthenticated } from "../middleware/Authentication.js";

const YtRouter = express.Router();

YtRouter.post('/create-yt-news', isAuthenticated, authorizeroles('admin'), createYtNews)
YtRouter.get('/news/youtube', getYtNewses)
YtRouter.post('/get-youtube-news', getYtNews)

YtRouter.post('/get-my-news-yt', isAuthenticated, authorizeroles("admin"), getMyNewsYt)
YtRouter.post('/get-my-news-count-yt', isAuthenticated, authorizeroles("admin"), getMyNewsCountYt)

export default YtRouter;