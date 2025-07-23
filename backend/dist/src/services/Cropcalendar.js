"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const application_errors_1 = require("../utils/application.errors");
const client_1 = require("../prisma/client");
class CropCelendarService {
    // ** generate crop calendar for a request
    async createCropCalendar(requestId, expertId) {
        try {
            const cropCalendar = await client_1.prisma.cropCalendar.findFirst({
                where: {
                    requestId: requestId,
                },
            });
            if (cropCalendar) {
                throw new application_errors_1.CropCalendarExistsError("Crop Calendar already exists");
            }
            const request = await client_1.prisma.cropCalandarRequest.findUnique({
                where: {
                    id: requestId,
                },
            });
            if (!request) {
                throw new Error("Request not found");
            }
            const payload = {
                requestId: requestId,
                expertId: expertId,
                season: request.season,
                createdAt: new Date(),
            };
            const response = await client_1.prisma.cropCalendar.create({
                data: payload,
            });
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    //   ** generate activity for a crop calendar
    async createActivities(cropCalendarId, cropcalendarActivityPayload) {
        try {
            console.log(cropcalendarActivityPayload);
            const cropCalendar = await client_1.prisma.cropCalendar.findUnique({
                where: {
                    id: cropCalendarId,
                },
                select: {
                    id: true,
                },
            });
            if (!cropCalendar) {
                throw new application_errors_1.EntityNotFoundError("Crop Calendar not found");
            }
            return client_1.prisma.$transaction(async (prismaInstance) => {
                const activitiesData = cropcalendarActivityPayload.map((activity) => ({
                    ...activity,
                    calandarId: cropCalendar.id,
                }));
                // ** insert Data in bulk
                const createdActivities = await prismaInstance.activity.createMany({
                    data: activitiesData,
                });
                return true;
            });
        }
        catch (error) {
            throw error;
        }
    }
    // ** change status to comppletd **
    async changeStatusToCompleted(requestId) {
        try {
            const cropCalendar = await client_1.prisma.cropCalandarRequest.findUnique({
                where: {
                    id: requestId,
                },
            });
            if (!cropCalendar) {
                throw new application_errors_1.EntityNotFoundError("Crop Calendar not found");
            }
            const response = await client_1.prisma.cropCalandarRequest.update({
                where: {
                    id: requestId,
                },
                data: {
                    status: "COMPLETED",
                },
            });
            console.log("response is - ", response);
            return true;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = CropCelendarService;
