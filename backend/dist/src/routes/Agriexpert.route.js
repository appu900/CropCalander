"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AgriExpert_controller_1 = require("../controllers/AgriExpert.controller");
const Agriexpert_dto_1 = require("../dtos/Agriexpert.dto");
const validate_dto_1 = require("../middleware/validate.dto");
const authenticationMiddleware_1 = require("../middleware/authenticationMiddleware");
const checkRequestStatus_1 = require("../middleware/checkRequestStatus");
const CropCendarController_1 = require("../controllers/CropCendarController");
const multerUpload_Middleware_1 = require("../middleware/multerUpload.Middleware");
const router = express_1.default.Router();
router.post("/expert", multerUpload_Middleware_1.uploadSingleImage, AgriExpert_controller_1.create);
router.post("/expert/login", (0, validate_dto_1.validateDTO)(Agriexpert_dto_1.AgriExpertLoginRequestDTO), AgriExpert_controller_1.login);
router.put("/expert/accept/:requestId", authenticationMiddleware_1.authMiddleware, checkRequestStatus_1.checkRequestStatus, AgriExpert_controller_1.acceptAgriExpertRequest);
router.get("/expert/ccr", authenticationMiddleware_1.authMiddleware, AgriExpert_controller_1.getAllRequestByAgriexpert);
router.post("/expert/cropcalendar/:requestId", authenticationMiddleware_1.authMiddleware, CropCendarController_1.generateCropCalendar);
router.put("/expert/activity/cropcalendar/:cropCalendarId", authenticationMiddleware_1.authMiddleware, CropCendarController_1.addAcitivity);
router.put("/expert/ccr/:cropCalendarId", authenticationMiddleware_1.authMiddleware, CropCendarController_1.handlechangeStatusToCompleted);
// ** feed routes 
router.post("/expert/post/create", multerUpload_Middleware_1.uploadSingleImage, authenticationMiddleware_1.authMiddleware, AgriExpert_controller_1.craeteAPost);
router.post("/expert/comment/post/:id", authenticationMiddleware_1.authMiddleware, AgriExpert_controller_1.makeAComment);
exports.default = router;
