
import express from 'express';
import { createFarmer, farmerLogin, getAllCropCalendarRequestForFarmer, handleAllCompletedCropcalendarRequest } from '../controllers/farmer.controller';

import { CreateFarmerDTO, FarmerLoginDTO } from '../dtos/farmer.dto';
import { validateDTO } from '../middleware/validate.dto';
import { authMiddleware } from '../middleware/authenticationMiddleware';
const router = express.Router();

router.post('/farmer',validateDTO(CreateFarmerDTO),createFarmer);
router.post('/farmer/login',validateDTO(FarmerLoginDTO),farmerLogin)
router.get('/farmer/ccr',authMiddleware,getAllCropCalendarRequestForFarmer)
router.get("/farmer/ccr/completed",authMiddleware,handleAllCompletedCropcalendarRequest)

export default router;  