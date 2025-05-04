import express from "express";
import { createAdvertisement, deleteAdvertisement, getAdminAdvertisement, getAdvertisement, getAdvertisementByCategory, getOneAdvertisement, getSideAdvertisement, updateAdvertisement, updateAdvertisementOrder } from "../controller/advertisement.controller.js";
import { authorizeroles, isAuthenticated } from "../middleware/Authentication.js";

export const AdvertisementRoutes = express.Router();


AdvertisementRoutes.post("/admin/ads/add", isAuthenticated, authorizeroles('admin'), createAdvertisement)
AdvertisementRoutes.get("/get-advertisement", getAdvertisement)
AdvertisementRoutes.get("/get-advertisement-category", getAdvertisementByCategory)
AdvertisementRoutes.get("/get-admin-advertisement", isAuthenticated, authorizeroles("admin"), getAdminAdvertisement)
AdvertisementRoutes.get("/get-advertisement/:id", getOneAdvertisement)
AdvertisementRoutes.get("/get-advertisement-side", getSideAdvertisement)
AdvertisementRoutes.put("/admin/ads/update/:id", updateAdvertisement)
AdvertisementRoutes.post("/admin/ads/update-order", isAuthenticated, authorizeroles("admin"), updateAdvertisementOrder)
AdvertisementRoutes.delete("/delete-advertisement/:id", deleteAdvertisement)
