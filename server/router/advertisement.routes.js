import express from "express";
import { createAdvertisement, deleteAdvertisement, getAdvertisement, updateAdvertisement } from "../controller/advertisement.controller.js";

export const AdvertisementRoutes = express.Router();


AdvertisementRoutes.post("/create-advertisement", createAdvertisement)
AdvertisementRoutes.get("/get-advertisement", getAdvertisement)
AdvertisementRoutes.put("/update-advertisement", updateAdvertisement)
AdvertisementRoutes.delete("/delete-advertisement", deleteAdvertisement)
