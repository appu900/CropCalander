"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const farmer_controller_1 = require("../controllers/farmer.controller");
const farmer_dto_1 = require("../dtos/farmer.dto");
const validate_dto_1 = require("../middleware/validate.dto");
const authenticationMiddleware_1 = require("../middleware/authenticationMiddleware");
const multerUpload_Middleware_1 = require("../middleware/multerUpload.Middleware");
const ServiceForms_dto_1 = require("../dtos/ServiceForms.dto");
const Others_controller_1 = require("../controllers/Others.controller");
const router = express_1.default.Router();
router.post("/farmer", multerUpload_Middleware_1.uploadSingleImage, farmer_controller_1.createFarmer);
router.post("/farmer/login", (0, validate_dto_1.validateDTO)(farmer_dto_1.FarmerLoginDTO), farmer_controller_1.farmerLogin);
router.put("/farmer/update", multerUpload_Middleware_1.uploadSingleImage, authenticationMiddleware_1.authMiddleware, farmer_controller_1.updateFarmer);
router.post("/farmer/account/delete", farmer_controller_1.deleteFarmeraAccount);
router.get("/farmer/ccr", authenticationMiddleware_1.authMiddleware, farmer_controller_1.getAllCropCalendarRequestForFarmer);
router.get("/farmer/ccr/completed", authenticationMiddleware_1.authMiddleware, farmer_controller_1.handleAllCompletedCropcalendarRequest);
router.post("/farmer/cropcalendar", authenticationMiddleware_1.authMiddleware, (0, validate_dto_1.validateDTO)(farmer_dto_1.FarmerCropCalendarCreationDTO), farmer_controller_1.createOwnCropCalendar);
router.post("/farmer/cropcalendar/:id", authenticationMiddleware_1.authMiddleware, (0, validate_dto_1.validateDTO)(farmer_dto_1.FarmerCropCalendarActivityDTO), farmer_controller_1.addActivityToFarmerCropCalendar);
router.get("/farmer/cropcalendar/all", authenticationMiddleware_1.authMiddleware, farmer_controller_1.getAllCropCalendarRequestForFarmer);
// ** social media endpoint
router.post("/farmer/posts/create", multerUpload_Middleware_1.uploadSingleImage, authenticationMiddleware_1.authMiddleware, farmer_controller_1.makeAPost);
router.put("/farmer/activity/add/:id", multerUpload_Middleware_1.uploadSingleImage, authenticationMiddleware_1.authMiddleware, farmer_controller_1.makeApostViaActivity);
// ** form request
router.post("/farmer/service/drone-spraying", (0, validate_dto_1.validateDTO)(ServiceForms_dto_1.DroneSprayingFormDTO), authenticationMiddleware_1.authMiddleware, farmer_controller_1.createDroneSprayingnForm);
router.post("/farmer/service/smart-irrigation", (0, validate_dto_1.validateDTO)(ServiceForms_dto_1.SmartIrrigationFormDto), authenticationMiddleware_1.authMiddleware, farmer_controller_1.createSmartIrrigationForm);
router.post("/farmer/service/soil-health-map", (0, validate_dto_1.validateDTO)(ServiceForms_dto_1.SoilHealthMapFormDto), authenticationMiddleware_1.authMiddleware, farmer_controller_1.createDigitalSoilHealthForm);
router.post("/farmer/ccr/updateactivity", multerUpload_Middleware_1.uploadSingleImage, authenticationMiddleware_1.authMiddleware, farmer_controller_1.addImagetoActicity);
router.get("/farmer/service/drone-spraying", farmer_controller_1.getDroneSparyingForms);
router.get("/farmer/service/smart-irrigation", farmer_controller_1.getSmartIrrigationForms);
router.post("/farmer/feedback", Others_controller_1.CreateFeedbackHandler);
router.get("/farmer/feedback", Others_controller_1.FetchAllFeedbackHandler);
router.post("/farmer/expert-visit", authenticationMiddleware_1.authMiddleware, Others_controller_1.CrerateExpertVisitFormHandler);
router.post("/farmer/soilHealth-map", authenticationMiddleware_1.authMiddleware, Others_controller_1.CreateSoilHealthMonitorHandler);
exports.default = router;
