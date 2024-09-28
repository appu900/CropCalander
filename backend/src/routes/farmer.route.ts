
import express from 'express';
import { createFarmer, farmerLogin } from '../controllers/farmer.controller';

import { CreateFarmerDTO, FarmerLoginDTO } from '../dtos/farmer.dto';
import { validateDTO } from '../middleware/validate.dto';
const router = express.Router();

router.post('/farmer',validateDTO(CreateFarmerDTO),createFarmer);
router.post('/farmer/login',validateDTO(FarmerLoginDTO),farmerLogin)

export default router;