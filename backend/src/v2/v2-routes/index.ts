import express from "express";
import {
  AcceptCropCalender,
  changeCropCalanderStatus,
  fetchAllAcceptedCropCalenderRequests,
  fetchAllCropCalenderRequests,
  fetchAllDroneSprayingRequest,
  fetchAllSmartIrrigationRequest,
  fetchAllSoilHealthMapRequest,
} from "../v2-service/expert-handler";
const router = express.Router();

router.get("/fetch-all-crop-calander-request", fetchAllCropCalenderRequests);
router.post("/accept-crop-calander-request", AcceptCropCalender);

router.put("/change-status-to-completed", changeCropCalanderStatus);

router.get(
  "/fetch-all-crop-calander-accepted-request",
  fetchAllAcceptedCropCalenderRequests
);


// forms 
router.get("/expert/drone/pending",fetchAllDroneSprayingRequest)
router.get("/expert/irrigation/pending",fetchAllSmartIrrigationRequest)
router.get("/expert/soilhealth/pending",fetchAllSoilHealthMapRequest)
router.get("/expert/visit/pending",fetchAllSoilHealthMapRequest)

export default router;
