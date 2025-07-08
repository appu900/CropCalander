import express from "express";
import {
  addActivityToFarmerCropCalendar,
  addImagetoActicity,
  createDigitalSoilHealthForm,
  createDroneSprayingnForm,
  createFarmer,
  createOwnCropCalendar,
  createSmartIrrigationForm,
  deleteFarmeraAccount,
  farmerLogin,
  getAllCropCalendarRequestForFarmer,
  getDroneSparyingForms,
  getSmartIrrigationForms,
  handleAllCompletedCropcalendarRequest,
  makeAPost,
  makeApostViaActivity,
  updateFarmer,
} from "../controllers/farmer.controller";

import {
  CreateFarmerDTO,
  FarmerCropCalendarActivityDTO,
  FarmerCropCalendarCreationDTO,
  FarmerLoginDTO,
} from "../dtos/farmer.dto";
import { validateDTO } from "../middleware/validate.dto";
import { authMiddleware } from "../middleware/authenticationMiddleware";
import { uploadSingleImage } from "../middleware/multerUpload.Middleware";
import {
  DroneSprayingFormDTO,
  SmartIrrigationFormDto,
  SoilHealthMapFormDto,
} from "../dtos/ServiceForms.dto";

const router = express.Router();

router.post("/farmer", uploadSingleImage, createFarmer);
router.post("/farmer/login", validateDTO(FarmerLoginDTO), farmerLogin);
router.put("/farmer/update", uploadSingleImage, authMiddleware, updateFarmer);
router.post("/farmer/account/delete", deleteFarmeraAccount);

router.get("/farmer/ccr", authMiddleware, getAllCropCalendarRequestForFarmer);
router.get(
  "/farmer/ccr/completed",
  authMiddleware,
  handleAllCompletedCropcalendarRequest
);

router.post(
  "/farmer/cropcalendar",
  authMiddleware,
  validateDTO(FarmerCropCalendarCreationDTO),
  createOwnCropCalendar
);
router.post(
  "/farmer/cropcalendar/:id",
  authMiddleware,
  validateDTO(FarmerCropCalendarActivityDTO),
  addActivityToFarmerCropCalendar
);
router.get(
  "/farmer/cropcalendar/all",
  authMiddleware,
  getAllCropCalendarRequestForFarmer
);

// ** social media endpoint

router.post(
  "/farmer/posts/create",
  uploadSingleImage,
  authMiddleware,
  makeAPost
);

router.put(
  "/farmer/activity/add/:id",
  uploadSingleImage,
  authMiddleware,
  makeApostViaActivity
);

// ** form request

router.post(
  "/farmer/service/drone-spraying",
  validateDTO(DroneSprayingFormDTO),
  authMiddleware,
  createDroneSprayingnForm
);
router.post(
  "/farmer/service/smart-irrigation",
  validateDTO(SmartIrrigationFormDto),
  authMiddleware,
  createSmartIrrigationForm
);
router.post(
  "/farmer/service/soil-health-map",
  validateDTO(SoilHealthMapFormDto),
  authMiddleware,
  createDigitalSoilHealthForm
);


router.post("/farmer/ccr/updateactivity",uploadSingleImage,authMiddleware,addImagetoActicity)

router.get("/farmer/service/drone-spraying", getDroneSparyingForms);
router.get("/farmer/service/smart-irrigation", getSmartIrrigationForms);

export default router;
