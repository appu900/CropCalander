"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticationMiddleware_1 = require("../middleware/authenticationMiddleware");
const LikeController_1 = require("../controllers/LikeController");
const router = express_1.default.Router();
router.post("/like/post/:id", authenticationMiddleware_1.authMiddleware, LikeController_1.likeAPost);
exports.default = router;
