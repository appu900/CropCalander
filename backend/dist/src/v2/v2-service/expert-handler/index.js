"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeCropCalanderStatus = exports.fetchAllAcceptedCropCalenderRequests = exports.AcceptCropCalender = exports.fetchAllCropCalenderRequests = void 0;
const http_status_codes_1 = require("http-status-codes");
const client_1 = require("../../../prisma/client");
const fetchAllCropCalenderRequests = async (req, res, next) => {
    try {
        const cropCalanderResponse = await client_1.prisma.cropCalandarRequest.findMany({
            include: {
                farmer: true,
            },
        });
        if (!cropCalanderResponse || cropCalanderResponse.length === 0) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                Status: "Error",
                message: "No Crop Calender Requests found",
            });
            return;
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({
            Status: "Success",
            message: "Crop Calender Requests fetched successfully",
            data: cropCalanderResponse,
        });
    }
    catch (error) {
        console.log("Something went wrong in fetchAllCropCalenderRequests", error);
        next(error);
    }
};
exports.fetchAllCropCalenderRequests = fetchAllCropCalenderRequests;
const AcceptCropCalender = async (req, res, next) => {
    try {
        const { cropCalenderRequestId } = req.body;
        if (!cropCalenderRequestId) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                Status: "Validation Error",
                message: "Crop Calender ID is required",
            });
            return;
        }
        const response = await client_1.prisma.cropCalandarRequest.update({
            where: {
                id: cropCalenderRequestId,
            },
            data: {
                status: "ACCEPTED",
            },
        });
        if (!response) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                Status: "Error",
                message: "Crop Calender Request not found",
            });
            return;
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({
            Status: "Success",
            message: "Crop Calender Request accepted successfully",
            data: response,
        });
    }
    catch (error) {
        console.log("Something went wrong in AcceptCropCalender", error);
        next(error);
    }
};
exports.AcceptCropCalender = AcceptCropCalender;
const fetchAllAcceptedCropCalenderRequests = async (req, res, next) => {
    try {
        const cropCalanderRequests = await client_1.prisma.cropCalandarRequest.findMany({
            where: {
                status: "ACCEPTED",
                cropCalandar: {
                    isNot: null,
                },
            },
            include: {
                farmer: true,
                cropCalandar: true,
            },
        });
        if (!cropCalanderRequests || cropCalanderRequests.length === 0) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                Status: "Error",
                message: "No Accepted Crop Calender Requests found",
            });
            return;
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({
            Status: "Success",
            message: "Accepted Crop Calender Requests fetched successfully",
            data: cropCalanderRequests,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.fetchAllAcceptedCropCalenderRequests = fetchAllAcceptedCropCalenderRequests;
const changeCropCalanderStatus = async (req, res, next) => {
    try {
        const { cropCalanderRequestID } = req.body;
        if (!cropCalanderRequestID) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                Status: "Validation Error",
                message: "Crop Calender Request ID is required",
            });
            return;
        }
        const response = await client_1.prisma.cropCalandarRequest.update({
            where: {
                id: cropCalanderRequestID,
            },
            data: {
                status: "COMPLETED",
            },
        });
        if (!response) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                Status: "Error",
                message: "Crop Calender Request not found",
            });
            return;
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({
            Status: "Success",
            message: "Crop Calender Request status changed to COMPLETED",
            data: response,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.changeCropCalanderStatus = changeCropCalanderStatus;
