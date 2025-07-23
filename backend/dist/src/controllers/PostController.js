"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAPost = exports.getAllCommentsOfAPost = exports.getAllPost = void 0;
const PostService_1 = __importDefault(require("../services/PostService"));
const http_status_codes_1 = require("http-status-codes");
const postService = new PostService_1.default();
const getAllPost = async (req, res, next) => {
    try {
        const response = await postService.getAllPosts();
        res.status(http_status_codes_1.StatusCodes.OK).json({
            ok: true,
            response,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllPost = getAllPost;
const getAllCommentsOfAPost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        if (!postId) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                error: "postId is required",
            });
            return;
        }
        const response = await postService.getAllCommentsOfAPost(Number(postId));
        res.status(http_status_codes_1.StatusCodes.OK).json({
            ok: true,
            response,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllCommentsOfAPost = getAllCommentsOfAPost;
const getAPost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        if (!postId) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                error: "postId is required",
            });
            return;
        }
        const response = await postService.getAPostDetails(Number(postId));
        res.status(http_status_codes_1.StatusCodes.OK).json({
            ok: true,
            response,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAPost = getAPost;
