import express from 'express';
import { acceptAgriExpertRequest, create, getAllRequestByAgriexpert, login } from '../controllers/AgriExpert.controller';
import { AgriExpertLoginRequestDTO, AgriExpertRequestDto } from '../dtos/Agriexpert.dto';
import { validateDTO } from '../middleware/validate.dto';
import { authMiddleware } from '../middleware/authenticationMiddleware';
import { checkRequestStatus } from '../middleware/checkRequestStatus';
import { addAcitivity, generateCropCalendar } from '../controllers/CropCendarController';
import { CropCalanderRequestDTO } from '../dtos/CropcalanderRequest';
import { CropCalendarActivityDTO } from '../dtos/Cropcalendar';
const router = express.Router();



router.post("/expert",validateDTO(AgriExpertRequestDto),create)
router.post("/expert/login",validateDTO(AgriExpertLoginRequestDTO),login)
router.put("/expert/accept/:requestId",authMiddleware,checkRequestStatus,acceptAgriExpertRequest)
router.get("/expert/ccr",authMiddleware,getAllRequestByAgriexpert)
router.post("/expert/cropcalendar/:requestId",authMiddleware,generateCropCalendar)
router.put("/expert/activity/cropcalendar/:cropCalendarId",authMiddleware,addAcitivity)

export default router;




