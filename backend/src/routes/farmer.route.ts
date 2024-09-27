
import express from 'express';
import { createFarmer } from '../controllers/farmer.controller';

import { CreateFarmerDTO } from '../dtos/farmer.dto';
import { validateDTO } from '../middleware/validate.dto';
const router = express.Router();

router.post('/farmer',validateDTO(CreateFarmerDTO),createFarmer);

export default router;