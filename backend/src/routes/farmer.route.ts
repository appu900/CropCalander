
import express from 'express';
import { createFarmer, farmerLogin, getAllCropCalendarRequestForFarmer } from '../controllers/farmer.controller';

import { CreateFarmerDTO, FarmerLoginDTO } from '../dtos/farmer.dto';
import { validateDTO } from '../middleware/validate.dto';
import { authMiddleware } from '../middleware/authenticationMiddleware';
const router = express.Router();

router.post('/farmer',validateDTO(CreateFarmerDTO),createFarmer);
router.post('/farmer/login',validateDTO(FarmerLoginDTO),farmerLogin)
router.get('/farmer/ccr',authMiddleware,getAllCropCalendarRequestForFarmer)

export default router;  