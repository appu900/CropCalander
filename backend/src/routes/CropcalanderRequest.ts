import express from "express";
import { authMiddleware } from "../middleware/authenticationMiddleware";
import { validateDTO } from "../middleware/validate.dto";
import { create, getAllpendingRequsts } from "../controllers/cropCalanderRequest.controller";
import { CropCalanderRequestDTO } from "../dtos/CropcalanderRequest";
const router = express.Router();

router.post("/create", authMiddleware,validateDTO(CropCalanderRequestDTO), create);
router.get("/pending",getAllpendingRequsts)


export default router;
