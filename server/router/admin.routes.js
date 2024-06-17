import express from "express";
import { authorizeroles, isAuthenticated } from "../middleware/Authentication.js";
import { deleteNewsAdmin, getAdminNewsCount, getNews } from "../controller/admin.controller.js";

export const adminRoutes = express.Router();


adminRoutes.post("/admin/get-all-news", isAuthenticated, authorizeroles('admin'), getNews)
adminRoutes.post('/get-admin-news-count', isAuthenticated, authorizeroles("admin"), getAdminNewsCount)
adminRoutes.delete('/admin/delete-news/:id', isAuthenticated, authorizeroles("admin"), deleteNewsAdmin)

export default adminRoutes;
