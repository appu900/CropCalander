"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeAPost = void 0;
const http_status_codes_1 = require("http-status-codes");
const Like_1 = __importDefault(require("../services/Like"));
const likeService = new Like_1.default();
const likeAPost = async (req, res, next) => {
    try {
        const userId = req.userId;
        const role = req.role;
        const postId = req.params.id;
        // handle edge cases
        if (!userId || !role || !postId) {
            res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                ok: false,
                error: "Unauthorized ateempt",
            });
            return;
        }
        const response = await likeService.toggleLike(Number(postId), Number(userId), role);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            ok: true,
            message: "Post Liked Successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.likeAPost = likeAPost;
