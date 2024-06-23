import express from "express";
import { authorizeroles, isAuthenticated } from "../middleware/Authentication.js";
import { Createuser, Deleteuser, GetUser, Updateuser, deleteNewsAdmin, getAdminNewsCount, getNews, getUsers } from "../controller/admin.controller.js";

export const adminRoutes = express.Router();


adminRoutes.post("/admin/get-all-news", isAuthenticated, authorizeroles('admin'), getNews)
adminRoutes.post('/get-admin-news-count', isAuthenticated, authorizeroles("admin"), getAdminNewsCount)
adminRoutes.delete('/admin/delete-news/:id', isAuthenticated, authorizeroles("admin"), deleteNewsAdmin)

adminRoutes.post('/admin/get-all-user', isAuthenticated, authorizeroles("admin"), getUsers)
adminRoutes.post('/admin/add-user', isAuthenticated, authorizeroles("admin"), Createuser)
adminRoutes.post('/admin/get-user', isAuthenticated, authorizeroles("admin"), GetUser)
adminRoutes.post('/admin/update-user', isAuthenticated, authorizeroles("admin"), Updateuser)
adminRoutes.delete('/admin/delete-user', isAuthenticated, authorizeroles("admin"), Deleteuser)

export default adminRoutes;
