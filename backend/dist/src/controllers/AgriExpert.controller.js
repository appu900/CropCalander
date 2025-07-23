"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAComment = exports.craeteAPost = exports.getAllRequestByAgriexpert = exports.acceptAgriExpertRequest = exports.login = exports.create = void 0;
const http_status_codes_1 = require("http-status-codes");
const zod_1 = require("zod");
const AgriExpert_1 = __importDefault(require("../services/AgriExpert"));
const application_errors_1 = require("../utils/application.errors");
const agriExpertValidation_1 = require("../validation/agriExpertValidation");
const s3_config_1 = require("../config/s3.config");
const sharp_1 = __importDefault(require("sharp"));
const agriExpertService = new AgriExpert_1.default();
const create = async (req, res, next) => {
    try {
        const payload = req.body;
        // ** Data validation
        const validatePayload = agriExpertValidation_1.agriExpertValidationSchema.parse(payload);
        let fileUrl = "";
        if (req.file) {
            const fileName = `${Date.now()}-${req.file.originalname}`;
            let optimizedBuffer = await (0, sharp_1.default)(req.file.buffer)
                .resize(1024)
                .toBuffer();
            fileUrl = await (0, s3_config_1.uploadToS3)(optimizedBuffer, fileName, req.file.mimetype);
            optimizedBuffer = null;
        }
        const createAgriExperPayload = {
            ...payload,
            profilePic: fileUrl,
        };
        const response = await agriExpertService.createAgriExpert(createAgriExperPayload);
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            ok: true,
            response,
        });
    }
    catch (error) {
        if (error instanceof application_errors_1.CustomError) {
            res.status(error.statusCode).json({
                ok: false,
                message: error.message,
            });
        }
        else if (error instanceof zod_1.z.ZodError) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                ok: false,
                error: error.errors,
            });
        }
        next(error);
    }
};
exports.create = create;
const login = async (req, res, next) => {
    try {
        const payload = req.body;
        const response = await agriExpertService.agriExpertLogin(payload);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            ok: true,
            response,
        });
    }
    catch (error) {
        if (error instanceof application_errors_1.CustomError) {
            res.status(error.statusCode).json({
                ok: false,
                message: error.message,
            });
        }
        next(error);
    }
};
exports.login = login;
const acceptAgriExpertRequest = async (req, res, next) => {
    try {
        const expertId = req.userId;
        if (!expertId) {
            res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                ok: false,
                message: "Unauthorized, no token provided",
            });
            return;
        }
        const requestId = req.params.requestId;
        const response = await agriExpertService.acceptRequest(expertId, Number(requestId));
        res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({
            ok: true,
            response,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.acceptAgriExpertRequest = acceptAgriExpertRequest;
const getAllRequestByAgriexpert = async (req, res, next) => {
    try {
        const agriexpertId = req.userId;
        if (!agriexpertId) {
            res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                ok: false,
                message: "Unauthorized, no token provided",
            });
            return;
        }
        const response = await agriExpertService.getRequestsByExpertId(agriexpertId);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            ok: true,
            response,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllRequestByAgriexpert = getAllRequestByAgriexpert;
// ** make a post for feed
const craeteAPost = async (req, res, next) => {
    try {
        const userId = req.userId;
        // ** handle UserId 
        if (!userId) {
            res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                ok: false,
                message: "Unauthorized, no token provided",
            });
            return;
        }
        // ** handle file upload
        let fileUrl = "";
        if (req.file) {
            const fileName = `${Date.now()}-${req.file.originalname}`;
            let optimizedBuffer = await (0, sharp_1.default)(req.file.buffer)
                .resize(1024)
                .toBuffer();
            fileUrl = await (0, s3_config_1.uploadToS3)(optimizedBuffer, fileName, req.file.mimetype);
            optimizedBuffer = null;
        }
        // ** handle post content
        const postContent = req.body.content;
        if (postContent.length < 10) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                ok: false,
                error: "the caption should be atlest 10 character",
            });
            return;
        }
        // ** make a post
        const response = await agriExpertService.makeAPost(postContent, fileUrl, userId);
        // ** send response
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            ok: true,
            response,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.craeteAPost = craeteAPost;
const makeAComment = async (req, res, next) => {
    try {
        const userId = req.userId;
        if (!userId) {
            res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                ok: false,
                error: "unauthorized attempt"
            });
            return;
        }
        const content = req.body.content;
        const postId = req.params.id;
        if (!postId) {
            res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                ok: false,
                error: "post id is required"
            });
            return;
        }
        const response = await agriExpertService.makeAComment(Number(postId), userId, content);
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            ok: true,
            response
        });
    }
    catch (error) {
        next(error);
    }
};
exports.makeAComment = makeAComment;
