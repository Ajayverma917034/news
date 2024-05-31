

import express from "express";

import { createYtNews, getYtNews, getYtNewses } from '../controller/yt-news.controller.js'
import { authorizeroles, isAuthenticated } from "../middleware/Authentication.js";

const YtRouter = express.Router();

YtRouter.post('/create-yt-news', isAuthenticated, authorizeroles('reporter'), createYtNews)
YtRouter.get('/news/youtube', getYtNewses)
YtRouter.post('/get-youtube-news', getYtNews)

export default YtRouter;