"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticationMiddleware_1 = require("../middleware/authenticationMiddleware");
const validate_dto_1 = require("../middleware/validate.dto");
const cropCalanderRequest_controller_1 = require("../controllers/cropCalanderRequest.controller");
const CropcalanderRequest_1 = require("../dtos/CropcalanderRequest");
const router = express_1.default.Router();
router.post("/create", authenticationMiddleware_1.authMiddleware, (0, validate_dto_1.validateDTO)(CropcalanderRequest_1.CropCalanderRequestDTO), cropCalanderRequest_controller_1.create);
router.get("/pending", cropCalanderRequest_controller_1.getAllpendingRequsts);
exports.default = router;
