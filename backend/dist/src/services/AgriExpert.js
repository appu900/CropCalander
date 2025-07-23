"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const encrypt_utils_1 = require("../utils/encrypt.utils");
const client_1 = require("../prisma/client");
const token_utils_1 = require("../utils/token.utils");
const application_errors_1 = require("../utils/application.errors");
class AgriExpertService {
    async createAgriExpert(requestData) {
        try {
            const existingAgriExpert = await client_1.prisma.agriExpert.findFirst({
                where: {
                    OR: [
                        {
                            email: requestData.email,
                        },
                        {
                            phoneNumber: requestData.phoneNumber,
                        },
                    ],
                },
            });
            if (existingAgriExpert) {
                throw new application_errors_1.DupliccateUserError("User with this email or phone number already exists");
            }
            const hashedPassword = (0, encrypt_utils_1.encryptPassword)(requestData.password);
            const newAgriExpert = await client_1.prisma.agriExpert.create({
                data: {
                    ...requestData,
                    password: hashedPassword,
                    profilePic: requestData.profilePic,
                },
            });
            const jwtToken = (0, token_utils_1.generateToken)(newAgriExpert.id, newAgriExpert.role);
            return {
                id: newAgriExpert.id,
                name: newAgriExpert.name,
                token: jwtToken,
                profilePic: newAgriExpert.profilePic,
            };
        }
        catch (error) {
            throw error;
        }
    }
    //   ** purpose login a agri expert with email and password
    async agriExpertLogin(loginData) {
        try {
            const agriExpert = await client_1.prisma.agriExpert.findFirst({
                where: {
                    email: loginData.email,
                },
            });
            if (!agriExpert) {
                throw new application_errors_1.userAutheticationError(`User not found with this ${loginData.email}`);
            }
            const correctPassword = (0, encrypt_utils_1.checkPassword)(loginData.password, agriExpert.password);
            if (!correctPassword) {
                throw new application_errors_1.userAutheticationError("Invalid Password");
            }
            const jwtToken = (0, token_utils_1.generateToken)(agriExpert.id, agriExpert.role);
            return {
                id: agriExpert.id,
                name: agriExpert.name,
                token: jwtToken,
                profilePic: agriExpert.profilePic,
            };
        }
        catch (error) {
            throw error;
        }
    }
    // ** asign agri expert for a cropCalanderrequest
    async acceptRequest(expertId, requestedCropCalandarId) {
        try {
            return await client_1.prisma.$transaction(async (prisma) => {
                const request = await prisma.$queryRaw `
      SELECT * 
      FROM "CropCalandarRequest"
      WHERE id = ${requestedCropCalandarId}
      AND "status" = 'PENDING'
      AND "expertId" IS NULL
      FOR UPDATE
    `;
                if (!request) {
                    throw new Error("Request already accepted");
                }
                const updatedRequest = await prisma.cropCalandarRequest.update({
                    where: {
                        id: requestedCropCalandarId,
                    },
                    data: {
                        status: "ACCEPTED",
                        expertId: expertId,
                    },
                });
                return updatedRequest;
            });
        }
        catch (error) {
            throw error;
        }
    }
    // ** get all cropcalander request assigned to a agriexpert
    async getRequestsByExpertId(expertId) {
        try {
            const response = await client_1.prisma.cropCalandarRequest.findMany({
                where: {
                    expertId: expertId,
                },
                include: {
                    cropCalandar: {
                        select: {
                            id: true,
                            season: true,
                            createdAt: true,
                            activities: true,
                        },
                    },
                },
            });
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async makeAPost(postContent, imageUrl, userId) {
        try {
            const post = await client_1.prisma.post.create({
                data: {
                    content: postContent,
                    image: imageUrl,
                    agriExpertId: userId,
                    postedByType: "AGRI_EXPERT",
                },
                select: {
                    id: true,
                    content: true,
                    image: true,
                    postedByType: true,
                },
            });
            return post;
        }
        catch (error) {
            throw error;
        }
    }
    // ** make a comment on a post
    async makeAComment(postId, userId, content) {
        try {
            const response = await client_1.prisma.comment.create({
                data: {
                    content: content,
                    agriExpertId: userId,
                    postId: postId,
                },
            });
            return response;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = AgriExpertService;
