
import express from 'express';
import { create, login } from '../controllers/AgriExpert.controller';
import { AgriExpertLoginRequestDTO, AgriExpertRequestDto } from '../dtos/Agriexpert.dto';
import { validateDTO } from '../middleware/validate.dto';
const router = express.Router();



router.post("/expert",validateDTO(AgriExpertRequestDto),create)
router.post("/expert/login",validateDTO(AgriExpertLoginRequestDTO),login)


export default router;




