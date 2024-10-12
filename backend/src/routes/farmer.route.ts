
import express from 'express';
import { addActivityToFarmerCropCalendar, createFarmer, createOwnCropCalendar, farmerLogin, getAllCropCalendarRequestForFarmer, handleAllCompletedCropcalendarRequest } from '../controllers/farmer.controller';

import { CreateFarmerDTO, FarmerCropCalendarActivityDTO, FarmerCropCalendarCreationDTO, FarmerLoginDTO } from '../dtos/farmer.dto';
import { validateDTO } from '../middleware/validate.dto';
import { authMiddleware } from '../middleware/authenticationMiddleware';  
import { uploadSingleImage } from '../middleware/multerUpload.Middleware';

const router = express.Router();

router.post('/farmer',uploadSingleImage,createFarmer);
router.post('/farmer/login',validateDTO(FarmerLoginDTO),farmerLogin)
router.get('/farmer/ccr',authMiddleware,getAllCropCalendarRequestForFarmer)
router.get("/farmer/ccr/completed",authMiddleware,handleAllCompletedCropcalendarRequest)


router.post("/farmer/cropcalendar",authMiddleware,validateDTO(FarmerCropCalendarCreationDTO),createOwnCropCalendar)
router.post("/farmer/cropcalendar/:id",authMiddleware,validateDTO(FarmerCropCalendarActivityDTO),addActivityToFarmerCropCalendar)
router.get("/farmer/cropcalendar/all",authMiddleware,getAllCropCalendarRequestForFarmer)

export default router;  