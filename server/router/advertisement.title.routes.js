import express from "express";
import { authorizeroles, isAuthenticated } from "../middleware/Authentication.js";
import { createAdvertisement, deleteAdvertisement, extendExpiry, getadminAdvertisementtitle, getAdvertisement, updateExpiredAdvertisement, updateTitleAdvertisement } from "../controller/titleadvertisement.controller.js";

export const TitleAdvertisementRoutes = express.Router();


TitleAdvertisementRoutes.post("/admin/ads-title/add", isAuthenticated, authorizeroles('admin'), createAdvertisement)
TitleAdvertisementRoutes.get("/get-title-advertisement", getAdvertisement)
TitleAdvertisementRoutes.get("/get-admin-title-advertisement", isAuthenticated, authorizeroles("admin"), getadminAdvertisementtitle)

TitleAdvertisementRoutes.put("/update-title-advetisement/:id", isAuthenticated, authorizeroles("admin"), updateTitleAdvertisement)
TitleAdvertisementRoutes.put("/admin/renew-expiry/:id", isAuthenticated, authorizeroles("admin"), updateExpiredAdvertisement)
TitleAdvertisementRoutes.delete("/admin/delete-advertisement-news/:id", isAuthenticated, authorizeroles("admin"), deleteAdvertisement)
TitleAdvertisementRoutes.put("/admin/extend-expiry/:id", isAuthenticated, authorizeroles("admin"), extendExpiry)
// TitleAdvertisementRoutes.get("/get-advertisement-side", getSideAdvertisement)
// TitleAdvertisementRoutes.put("/admin/ads/update/:id", updateAdvertisement)
// TitleAdvertisementRoutes.post("/admin/ads/update-order", isAuthenticated, authorizeroles("admin"), updateAdvertisementOrder)


export default TitleAdvertisementRoutes;
