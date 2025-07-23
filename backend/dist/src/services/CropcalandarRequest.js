"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CropcalanderRequest_1 = require("../dtos/CropcalanderRequest");
const client_1 = require("../prisma/client");
class CropCalanderRequestService {
    async createCropCalanderRequest(farmerId, payload) {
        try {
            const response = await client_1.prisma.cropCalandarRequest.create({
                data: {
                    farmerId: farmerId,
                    cropName: payload.cropName,
                    season: payload.season,
                    location: payload.location,
                    filedSize: payload.fieldSize,
                    startDate: payload.startDate,
                    cropType: payload.cropType,
                    projectName: payload.projectName,
                    projectDescription: payload.projectDescription,
                    seedVaraity: payload.seedVaraity,
                },
            });
            return {
                id: response.id,
                farmerId: response.farmerId,
                cropName: response.cropName,
                season: response.season,
                location: response.location,
                startDate: response.startDate,
                cropType: response.cropType,
                status: response.status,
                projectName: response.projectName ?? "",
                projectDescription: response.projectDescription ?? "",
            };
        }
        catch (error) {
            throw error;
        }
    }
    // ** get all cropcalander request with pending status
    async getAllPendingCropCalanderRequest() {
        try {
            const response = await client_1.prisma.cropCalandarRequest.findMany({
                where: {
                    status: "PENDING",
                },
            });
            const responseObj = CropcalanderRequest_1.CropCalendarRequestMapper.toDTOList(response);
            return responseObj;
        }
        catch (error) {
            throw error;
        }
    }
    async findCropCalandersRequestByFarmerId(farmerId) {
        try {
            const response = await client_1.prisma.cropCalandarRequest.findMany({
                where: {
                    farmerId: farmerId,
                },
                include: {
                    expert: {
                        select: {
                            name: true,
                        },
                    },
                },
            });
            console.log("response is - ", response);
            if (!response) {
                return "no cropcalndar found";
            }
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async findCropCalendarRequestWithStatusCompleted(farmerId) {
        try {
            const response = await client_1.prisma.cropCalandarRequest.findMany({
                where: {
                    farmerId: farmerId,
                    status: "COMPLETED"
                },
                include: {
                    cropCalandar: {
                        select: {
                            farmerRequest: true,
                            activities: true
                        }
                    }
                },
            });
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async findCropCalendarRequestwithStatusAccepted(farmerId) {
        try {
            const response = await client_1.prisma.cropCalandarRequest.findMany({
                where: {
                    status: "ACCEPTED",
                    farmerId: farmerId,
                },
            });
            return response;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = CropCalanderRequestService;
