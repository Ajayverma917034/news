import express from "express";
import { authorizeroles, isAuthenticated } from "../middleware/Authentication.js";
import { Createuser, Deleteuser, GetUser, Updateuser, deleteNewsAdmin, getAdminNewsCount, getNews, getUsers, resetPassword, sendOtp, updateUser } from "../controller/admin.controller.js";

export const adminRoutes = express.Router();


adminRoutes.post("/admin/get-all-news", isAuthenticated, authorizeroles('admin'), getNews)
adminRoutes.post('/get-admin-news-count', isAuthenticated, authorizeroles("admin"), getAdminNewsCount)
adminRoutes.delete('/admin/delete-news/:id', isAuthenticated, authorizeroles("admin"), deleteNewsAdmin)

adminRoutes.post('/admin/get-all-user', isAuthenticated, authorizeroles("admin"), getUsers)
adminRoutes.post('/admin/add-user', isAuthenticated, authorizeroles("admin"), Createuser)
adminRoutes.post('/admin/get-user', isAuthenticated, authorizeroles("admin"), GetUser)
adminRoutes.put('/admin/update-user', isAuthenticated, authorizeroles("admin"), updateUser)
adminRoutes.delete('/admin/delete-user', isAuthenticated, authorizeroles("admin"), Deleteuser)




adminRoutes.post('/admin/send-otp', isAuthenticated, authorizeroles("admin"), sendOtp)
adminRoutes.post('/admin/reset-password', isAuthenticated, authorizeroles("admin"), resetPassword)






export default adminRoutes;
