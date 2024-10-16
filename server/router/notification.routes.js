
import express from 'express';
import { sendNotification, subscribeNotification } from '../controller/pushnotification.controller.js';

const pushNotificationRouter = express.Router();

pushNotificationRouter.post('/save-subscription', subscribeNotification)
pushNotificationRouter.get('/send-notification', sendNotification)

export default pushNotificationRouter;