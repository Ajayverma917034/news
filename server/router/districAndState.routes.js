import express from 'express'
import { createState, districtCreate } from '../controller/state.controller.js';
import { authorizeroles, isAuthenticated } from '../middleware/Authentication.js';
const districtAndStateRouter = express.Router()

districtAndStateRouter.post('/create-state', isAuthenticated, authorizeroles("admin"), createState);
districtAndStateRouter.post('/create-district', isAuthenticated, authorizeroles("admin"), districtCreate);


export default districtAndStateRouter;