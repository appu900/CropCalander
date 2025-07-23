"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const expert_handler_1 = require("../v2-service/expert-handler");
const router = express_1.default.Router();
router.get("/fetch-all-crop-calander-request", expert_handler_1.fetchAllCropCalenderRequests);
router.post("/accept-crop-calander-request", expert_handler_1.AcceptCropCalender);
router.put("/change-status-to-completed", expert_handler_1.changeCropCalanderStatus);
router.get("/fetch-all-crop-calander-accepted-request", expert_handler_1.fetchAllAcceptedCropCalenderRequests);
exports.default = router;
