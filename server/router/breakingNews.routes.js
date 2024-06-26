import express from "express";
import { Createnews, Deletenews, GetAdminNews, Getallnews, Getnews, Updatenews, getAdminNewsCount } from "../controller/breakingNews.controller.js";
import { authorizeroles, isAuthenticated } from "../middleware/Authentication.js";


const BreakinNewsRouter = express.Router();

BreakinNewsRouter.post("/admin/create-breaking-news", isAuthenticated, authorizeroles("admin"), Createnews);
BreakinNewsRouter.post("/admin/get-breaking-news", isAuthenticated, authorizeroles("admin"), GetAdminNews);
BreakinNewsRouter.post("/admin/get-breaking-news-count", isAuthenticated, authorizeroles("admin"), getAdminNewsCount);
BreakinNewsRouter.get("/find-news/:id", Getnews);
BreakinNewsRouter.get("/breaking-news", Getallnews);
BreakinNewsRouter.put("/admin/update-news/:id", Updatenews);
BreakinNewsRouter.delete("/admin/delete-breaking-news/:id", Deletenews);

export default BreakinNewsRouter