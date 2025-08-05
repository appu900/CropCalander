import express from 'express';
import { acceptAgriExpertRequest, craeteAPost, create, getAllRequestByAgriexpert, login, makeAComment } from '../controllers/AgriExpert.controller';
import { AgriExpertLoginRequestDTO, AgriExpertRequestDto } from '../dtos/Agriexpert.dto';
import { validateDTO } from '../middleware/validate.dto';
import { authMiddleware } from '../middleware/authenticationMiddleware';
import { checkRequestStatus } from '../middleware/checkRequestStatus';
import { addAcitivity, generateCropCalendar, handlechangeStatusToCompleted } from '../controllers/CropCendarController';
import { CropCalanderRequestDTO } from '../dtos/CropcalanderRequest';
import { CropCalendarActivityDTO } from '../dtos/Cropcalendar';
import { uploadSingleImage } from '../middleware/multerUpload.Middleware';
import { fileupload, testUpload, uploadDroneSprayingSolution, uploadExpertvisitSolution, uploadSmartIrrigatinSolution, uploadSoilhealthMapSolution } from '../controllers/Form.controller';
const router = express.Router();



router.post("/expert",uploadSingleImage,create)
router.post("/expert/login",validateDTO(AgriExpertLoginRequestDTO),login)
router.put("/expert/accept/:requestId",authMiddleware,checkRequestStatus,acceptAgriExpertRequest)
router.get("/expert/ccr",authMiddleware,getAllRequestByAgriexpert)
router.post("/expert/cropcalendar/:requestId",authMiddleware,generateCropCalendar)
router.put("/expert/activity/cropcalendar/:cropCalendarId",authMiddleware,addAcitivity)
router.put("/expert/ccr/:cropCalendarId",authMiddleware,handlechangeStatusToCompleted)


// ** feed routes 

router.post("/expert/post/create",uploadSingleImage,authMiddleware,craeteAPost)
router.post("/expert/comment/post/:id",authMiddleware,makeAComment)



router.post("/expert/file-upload",fileupload.single('pdf'),testUpload)
router.post("/expert/file-upload/dronespraying/:id",fileupload.single("pdf"),uploadDroneSprayingSolution)
router.post("/expert/file-upload/soilhealthmap/:id",fileupload.single("pdf"),uploadSoilhealthMapSolution)
router.post("/expert/file-upload/smartirrigation/:id",fileupload.single("pdf"),uploadSmartIrrigatinSolution)
router.post("/expert/file-upload/expertvisit/:id",fileupload.single("pdf"),uploadExpertvisitSolution)

export default router;









