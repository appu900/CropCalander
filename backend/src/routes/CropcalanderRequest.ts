import express from "express";
import { authMiddleware } from "../middleware/authenticationMiddleware";
import { validateDTO } from "../middleware/validate.dto";
import {
  changeStatusToComplete,
  create,
  fetchAllCompletedCropCalanderforFramer,
  getAllpendingRequsts,
} from "../controllers/cropCalanderRequest.controller";
import { CropCalanderRequestDTO } from "../dtos/CropcalanderRequest";
import {
  getAllCropCalendarsOfFarmer,
  getAllRequestedCropCalander,
} from "../controllers/farmer.controller";
const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  validateDTO(CropCalanderRequestDTO),
  create
);
router.get("/pending", getAllpendingRequsts);

router.get("/farmer-requested", authMiddleware, getAllRequestedCropCalander);
router.put("/mark-completed", changeStatusToComplete);

router.get(
  "/farmer-completed-cropcalander",
  authMiddleware,
  fetchAllCompletedCropCalanderforFramer
);

export default router;

// https://krishiaadhar.gramtarang.org
