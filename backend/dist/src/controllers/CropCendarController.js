"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlechangeStatusToCompleted = exports.addAcitivity = exports.generateCropCalendar = void 0;
const Cropcalendar_1 = __importDefault(require("../services/Cropcalendar"));
const application_errors_1 = require("../utils/application.errors");
const http_status_codes_1 = require("http-status-codes");
const zod_1 = require("zod");
const cropcalendarActivitySchema_1 = require("../validation/cropcalendarActivitySchema");
const cropCalendarService = new Cropcalendar_1.default();
const bulkCropCalendarActivitySchema = zod_1.z.object({
    activities: zod_1.z.array(cropcalendarActivitySchema_1.cropCalendarActivitySchema)
});
const generateCropCalendar = async (req, res, next) => {
    try {
        const requestId = req.params.requestId;
        const expertId = req.userId;
        if (!expertId) {
            res.status(401).json({
                ok: false,
                message: "Unauthorized, no token provided",
            });
            return;
        }
        const response = await cropCalendarService.createCropCalendar(Number(requestId), expertId);
        res.status(201).json({
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
exports.generateCropCalendar = generateCropCalendar;
const addAcitivity = async (req, res, next) => {
    try {
        const activityPayload = req.body.activities;
        const cropCalendarId = req.params.cropCalendarId;
        const validatePayload = bulkCropCalendarActivitySchema.parse(req.body);
        const response = await cropCalendarService.createActivities(Number(cropCalendarId), validatePayload.activities);
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            ok: true,
            response
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                ok: false,
                message: "validation failed",
                error: error.errors
            });
        }
        next(error);
    }
};
exports.addAcitivity = addAcitivity;
const handlechangeStatusToCompleted = async (req, res, next) => {
    try {
        const cropCalendarId = req.params.cropCalendarId;
        const response = await cropCalendarService.changeStatusToCompleted(Number(cropCalendarId));
        res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({
            ok: true,
            response
        });
    }
    catch (error) {
        if (error instanceof application_errors_1.CustomError) {
            res.status(error.statusCode).json({
                ok: false,
                error: error.message
            });
        }
        next(error);
    }
};
exports.handlechangeStatusToCompleted = handlechangeStatusToCompleted;
