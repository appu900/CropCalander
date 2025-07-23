"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSoilHealthMonitorHandler = exports.CrerateExpertVisitFormHandler = exports.FetchAllFeedbackHandler = exports.CreateFeedbackHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const client_1 = require("../prisma/client");
const CreateFeedbackHandler = async (req, res, next) => {
    try {
        const { star, feedbackCategory, feedbackContent } = req.body;
        const response = await client_1.prisma.feedback.create({
            data: {
                star: Number(star),
                feedbackCategory: feedbackCategory,
                feedback: feedbackContent,
            },
        });
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            message: "thank you for your feedback",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.CreateFeedbackHandler = CreateFeedbackHandler;
const FetchAllFeedbackHandler = async (req, res, next) => {
    try {
        const response = await client_1.prisma.feedback.findMany();
        res.status(http_status_codes_1.StatusCodes.OK).json({
            message: "all feddback fetched sucessfully",
            response,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.FetchAllFeedbackHandler = FetchAllFeedbackHandler;
const CrerateExpertVisitFormHandler = async (req, res, next) => {
    try {
        const userId = req.userId;
        if (!userId) {
            res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                message: "Authorization required",
            });
        }
        const { farmLocation, cropType, AreainHector, Query } = req.body;
        const data = await client_1.prisma.expertVisit.create({
            data: {
                farmLocation,
                cropType,
                AreainHector,
                Query,
                farmerID: Number(userId),
            },
        });
        res.status(201).json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.CrerateExpertVisitFormHandler = CrerateExpertVisitFormHandler;
const CreateSoilHealthMonitorHandler = async (req, res, next) => {
    try {
        const userID = req.userId;
        console.log(userID);
        if (!userID) {
            res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                message: "Authorization required",
            });
            return;
        }
        const { cropType, soilType, areaInHectares, query, farmLocation } = req.body;
        console.log(req.body);
        const response = await client_1.prisma.soilHealthMapForm.create({
            data: {
                cropType,
                soilType,
                areaInHectares: parseFloat(areaInHectares),
                query,
                farmerId: Number(userID),
                farmLoaction: farmLocation,
            },
        });
        console.log(response);
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            message: "Soil health map form created successfully",
            response,
        });
    }
    catch (error) {
        console.log(error.message);
        next(error);
    }
};
exports.CreateSoilHealthMonitorHandler = CreateSoilHealthMonitorHandler;
