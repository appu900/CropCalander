import express from 'express';
import { acceptAgriExpertRequest, create, getAllRequestByAgriexpert, login } from '../controllers/AgriExpert.controller';
import { AgriExpertLoginRequestDTO, AgriExpertRequestDto } from '../dtos/Agriexpert.dto';
import { validateDTO } from '../middleware/validate.dto';
import { authMiddleware } from '../middleware/authenticationMiddleware';
import { checkRequestStatus } from '../middleware/checkRequestStatus';
import { generateCropCalendar } from '../controllers/CropCendarController';
const router = express.Router();



router.post("/expert",validateDTO(AgriExpertRequestDto),create)
router.post("/expert/login",validateDTO(AgriExpertLoginRequestDTO),login)
router.put("/expert/accept/:requestId",authMiddleware,checkRequestStatus,acceptAgriExpertRequest)
router.get("/expert/ccr",authMiddleware,getAllRequestByAgriexpert)
router.post("/expert/cropcalendar/:requestId",authMiddleware,generateCropCalendar)

export default router;




