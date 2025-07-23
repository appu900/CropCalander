import express from "express";
import {
  AcceptCropCalender,
  changeCropCalanderStatus,
  fetchAllAcceptedCropCalenderRequests,
  fetchAllCropCalenderRequests,
} from "../v2-service/expert-handler";
const router = express.Router();

router.get("/fetch-all-crop-calander-request", fetchAllCropCalenderRequests);
router.post("/accept-crop-calander-request", AcceptCropCalender);

router.put("/change-status-to-completed", changeCropCalanderStatus);

router.get(
  "/fetch-all-crop-calander-accepted-request",
  fetchAllAcceptedCropCalenderRequests
);

export default router;
