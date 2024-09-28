



import express from 'express';
import { create } from '../controllers/AgriExpert.controller';
import { AgriExpertRequestDto } from '../dtos/Agriexpert.dto';
import { validateDTO } from '../middleware/validate.dto';
const router = express.Router();



router.post("/expert",validateDTO(AgriExpertRequestDto),create)


export default router;