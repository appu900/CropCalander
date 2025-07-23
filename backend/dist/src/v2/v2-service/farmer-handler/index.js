"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllCropCalanderRequest = exports.fetchAllCompletedCropCalander = void 0;
const client_1 = require("../../../prisma/client");
const http_status_codes_1 = require("http-status-codes");
const fetchAllCompletedCropCalander = async (req, res, next) => {
    try {
        const farmerID = req.userId;
        const completedCropCalander = await client_1.prisma.cropCalandarRequest.findMany({
            where: {
                farmerId: farmerID,
                status: "COMPLETED",
                cropCalandar: {
                    isNot: null,
                },
            },
            include: {
                cropCalandar: {
                    include: {
                        activities: true,
                    },
                },
            },
        });
        res.status(http_status_codes_1.StatusCodes.OK).json(completedCropCalander);
    }
    catch (error) {
        next(error);
    }
};
exports.fetchAllCompletedCropCalander = fetchAllCompletedCropCalander;
const fetchAllCropCalanderRequest = async (req, res, next) => {
    try {
        const farmerID = req.userId;
        const resquests = await client_1.prisma.cropCalandarRequest.findMany({
            where: {
                farmerId: farmerID,
            },
            include: {
                expert: true,
                cropCalandar: {
                    include: {
                        activities: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        res.status(http_status_codes_1.StatusCodes.OK).json(resquests);
    }
    catch (error) {
        next(error);
    }
};
exports.fetchAllCropCalanderRequest = fetchAllCropCalanderRequest;
