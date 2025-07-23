"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../prisma/client");
const encrypt_utils_1 = require("../utils/encrypt.utils");
const application_errors_1 = require("../utils/application.errors");
const token_utils_1 = require("../utils/token.utils");
const express_1 = require("express");
class FarmerService {
    async createFarmer(data) {
        try {
            const hashedPassword = (0, encrypt_utils_1.encryptPassword)(data.password);
            const existingFarmer = await client_1.prisma.farmer.findUnique({
                where: {
                    phoneNumber: data.phoneNumber,
                },
            });
            if (existingFarmer) {
                if (existingFarmer.email === data.email) {
                    throw new application_errors_1.DuplicatePhoneNumberError("Phone Number already exists");
                }
                throw new application_errors_1.DuplicateEntityError("Farmer already exists with this email");
            }
            const farmer = await client_1.prisma.farmer.create({
                data: {
                    name: data.name,
                    email: data.email ?? "",
                    password: hashedPassword,
                    phoneNumber: data.phoneNumber,
                    profilePic: data.profilePic
                        ? data.profilePic
                        : "https://avatar.iran.liara.run/public/23",
                    address: data.address,
                },
            });
            const jwtToken = (0, token_utils_1.generateToken)(farmer.id, farmer.role);
            return {
                name: farmer.name,
                email: farmer.email,
                phoneNumber: farmer.phoneNumber,
                token: jwtToken,
                role: farmer.role,
                profilePic: farmer.profilePic,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async farmerLogin(data) {
        try {
            const farmer = await client_1.prisma.farmer.findUnique({
                where: {
                    phoneNumber: data.phoneNumber,
                },
            });
            if (!farmer) {
                throw new application_errors_1.userAutheticationError(`user not found with this ${data.phoneNumber}`);
            }
            const correctPasssword = (0, encrypt_utils_1.checkPassword)(data.password, farmer.password);
            if (!correctPasssword) {
                throw new application_errors_1.userAutheticationError("Invalid Password");
            }
            const jwtToken = (0, token_utils_1.generateToken)(farmer.id, farmer.role);
            return {
                name: farmer.name,
                email: farmer.email,
                phoneNumber: farmer.phoneNumber,
                token: jwtToken,
                role: farmer.role,
                profilePic: farmer.profilePic,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async updateFarmer(farmerId, data) {
        try {
            const existingFarmer = await client_1.prisma.farmer.findUnique({
                where: { id: farmerId },
            });
            if (!existingFarmer) {
                throw new application_errors_1.EntityNotFoundError("Farmer not found");
            }
            let hashedPassword;
            if (data.password) {
                hashedPassword = (0, encrypt_utils_1.encryptPassword)(data.password);
            }
            const updatedFarmer = await client_1.prisma.farmer.update({
                where: { id: farmerId },
                data: {
                    name: data.name ?? existingFarmer.name,
                    email: data.email ?? existingFarmer.email,
                    password: hashedPassword ?? existingFarmer.password,
                    phoneNumber: data.phoneNumber ?? existingFarmer.phoneNumber,
                    profilePic: data.profilePic ?? existingFarmer.profilePic,
                },
            });
            const jwtToken = (0, token_utils_1.generateToken)(updatedFarmer.id, updatedFarmer.role);
            return {
                name: updatedFarmer.name,
                email: updatedFarmer.email,
                phoneNumber: updatedFarmer.phoneNumber,
                token: jwtToken,
                role: updatedFarmer.role,
                profilePic: updatedFarmer.profilePic,
            };
        }
        catch (error) {
            throw error;
        }
    }
    // ** create own cropcalendar SERVICE METHOD
    async createOwnCropCalendar(payload, farmerId) {
        try {
            const cropCalendar = await client_1.prisma.farmerCropCalendar.create({
                data: {
                    projectName: payload.projectName,
                    projectDescription: payload.projectDescription,
                    cropName: payload.cropName,
                    cropType: payload.cropType,
                    fieldSize: payload.fieldSize,
                    seedVariety: payload.seedVariety,
                    location: payload.location,
                    season: payload.season,
                    startDate: payload.startDate,
                    farmerId: farmerId,
                },
            });
            return cropCalendar;
        }
        catch (error) {
            throw error;
        }
    }
    // ** update activity status of a cropcalendar of a farmer..
    async addActivityToCropcalendar(payload, cropCalendarId) {
        try {
            const cropCalendar = await client_1.prisma.farmerCropCalendar.findUnique({
                where: {
                    id: cropCalendarId,
                },
            });
            if (!cropCalendar) {
                throw new application_errors_1.EntityNotFoundError("CropCalendar not found");
            }
            const updatedCropCalendar = await client_1.prisma.farmerCropCalendarActivity.create({
                data: {
                    activityName: payload.activityName,
                    description: payload.description,
                    startTime: payload.startTime,
                    endTime: payload.endTime,
                    farmerCropCalendarId: cropCalendarId,
                    startDate: payload.startDate
                },
            });
            return updatedCropCalendar;
        }
        catch (error) {
            throw error;
        }
    }
    // async addAimageToActivityWithPostAutomation(
    // )
    // ** get all cropcalendar  for farmer
    async getALLCropCalendarOfFarmer(farmerId) {
        try {
            const calendars = await client_1.prisma.farmerCropCalendar.findMany({
                where: {
                    farmerId: farmerId,
                },
                include: {
                    FarmerCropCalendarActivity: true,
                },
            });
            return calendars;
        }
        catch (error) {
            throw error;
        }
    }
    // ** Farmer will make a post.
    async createPost(postContent, imageUrl, farmerId) {
        try {
            const post = await client_1.prisma.post.create({
                data: {
                    content: postContent,
                    image: imageUrl,
                    farmerId: farmerId,
                    postedByType: "FARMER",
                },
            });
            return post;
        }
        catch (error) {
            throw error;
        }
    }
    async updateImageToActivity(imageUrl, caption, activityId, farmerId) {
        try {
            const response = await client_1.prisma.$transaction([
                client_1.prisma.farmerCropCalendarActivity.update({
                    where: {
                        id: activityId,
                    },
                    data: {
                        image: imageUrl,
                        caption: caption,
                    },
                }),
                client_1.prisma.post.create({
                    data: {
                        content: caption,
                        image: imageUrl,
                        farmerId: farmerId,
                        postedByType: "FARMER",
                    },
                }),
            ]);
            return {
                activity: response[0],
                post: response[1],
            };
        }
        catch (error) {
            throw error;
        }
    }
    // ** create a drone spraying form
    async createDroneSprayingForm(farmerId, data) {
        try {
            const response = await client_1.prisma.droneSprayingFrom.create({
                data: {
                    farmerId: farmerId,
                    farmLoaction: data.farmLocation,
                    cropType: data.cropType,
                    areaInHectares: data.areaInHectares,
                    sprayDate: data.sprayDate,
                    query: data.query ?? "No query provided",
                },
            });
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async createSmartIrrigationFrom(farmerId, data) {
        try {
            const response = await client_1.prisma.smartIrrigationForm.create({
                data: {
                    farmerId: farmerId,
                    farmLoaction: data.farmLocation,
                    cropType: data.cropType,
                    areaInHectares: data.areaInHectares,
                    query: data.query ?? "No query provided",
                    irrigationType: data.irrigationType,
                },
            });
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    // ** create a soil health map form
    async createSoilHealthMapForm(farmerId, data) {
        try {
            const response = await client_1.prisma.soilHealthMapForm.create({
                data: {
                    farmerId: farmerId,
                    farmLoaction: data.farmLocation,
                    soilType: data.soilType,
                    cropType: data.cropType,
                    areaInHectares: data.areaInHectares,
                    query: data.query ?? "No query provided",
                },
            });
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    // ** delete farmer data from db including all cropcalandar and activities
    async deleteFarmerData(farmerPhoneNumber, providedPassword, feeedback) {
        try {
            const existingfarmer = await client_1.prisma.farmer.findFirst({
                where: {
                    phoneNumber: farmerPhoneNumber,
                },
            });
            // ** if we dont get any farmer with this email
            if (!existingfarmer) {
                throw new application_errors_1.EntityNotFoundError("Farmer not found");
            }
            // ** check if password is correct
            const correctPassword = (0, encrypt_utils_1.checkPassword)(providedPassword, existingfarmer.password);
            if (!correctPassword) {
                throw new application_errors_1.userAutheticationError("its not your account");
            }
            // ** delete all cropcalandar and activities of this farmer with a prisma transanction
            // ** delete all posts cropcalander is exists with activity all deatils of a farmer
            // ** add a new activity data
            // ** do all things in a prisma transaction
            const response = await client_1.prisma.$transaction([
                client_1.prisma.farmer.delete({
                    where: {
                        id: existingfarmer.id,
                    },
                }),
                client_1.prisma.deleteAccountFeedback.create({
                    data: {
                        farmerEmail: existingfarmer.email ?? "No email provided",
                        feedback: feeedback,
                        farmerPhoneNumber: existingfarmer.phoneNumber,
                    },
                }),
            ]);
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async getDroneSprayingForms() {
        return await client_1.prisma.droneSprayingFrom.findMany({
            include: {
                farmer: {
                    select: {
                        name: true,
                        phoneNumber: true,
                        email: true,
                    },
                },
            },
        });
    }
    async getSmartIrrigationForms() {
        return await client_1.prisma.smartIrrigationForm.findMany({
            include: {
                farmer: {
                    select: {
                        name: true,
                        phoneNumber: true,
                        email: true,
                    },
                },
            },
        });
    }
    async addImagetoActivityAutomation(payload) {
        await client_1.prisma.$transaction(async (tx) => {
            const response = await tx.farmerCropCalendarActivity.update({
                where: {
                    id: Number(payload.activityID),
                },
                data: {
                    image: payload.imageUrl,
                },
            });
            if (response) {
                await tx.post.create({
                    data: {
                        content: payload.caption,
                        image: payload.imageUrl,
                        farmerId: Number(payload.userID),
                        postedByType: "FARMER",
                    },
                });
            }
        });
        return express_1.response;
    }
}
exports.default = FarmerService;
// ** farmer can make a post
// ** post will contain title description
// ** profile picture
// ** role based authetication .
// ** Agri expert will just
