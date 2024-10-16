"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../prisma/client");
class LikeService {
    /**
     *  first find existing like
     *  if there is like thn do unlike
     *  if unlike thn do like
     *  FARMER
        AGRI_EXPERT
     * */
    async toggleLike(postId, userId, role) {
        try {
            let existingLike;
            if (role === "FARMER") {
                existingLike = await client_1.prisma.like.findFirst({
                    where: {
                        postId,
                        farmerId: userId,
                    },
                });
            }
            else if (role === "AGRI_EXPERT") {
                existingLike = await client_1.prisma.like.findFirst({
                    where: {
                        postId,
                        agriExpertId: userId,
                    },
                });
            }
            if (existingLike) {
                await client_1.prisma.$transaction([
                    client_1.prisma.like.delete({
                        where: {
                            id: existingLike.id,
                        },
                    }),
                    client_1.prisma.post.update({
                        where: { id: postId },
                        data: { likeCount: { decrement: 1 } },
                    }),
                ]);
                return true;
            }
            else {
                // ** if liked by farmer
                if (role === "FARMER") {
                    await client_1.prisma.$transaction([
                        client_1.prisma.like.create({
                            data: {
                                postId,
                                farmerId: userId,
                                userType: "FARMER",
                            },
                        }),
                        client_1.prisma.post.update({
                            where: { id: postId },
                            data: {
                                likeCount: { increment: 1 },
                            },
                        }),
                    ]);
                }
                else if (role === "AGRI_EXPERT") {
                    await client_1.prisma.$transaction([
                        client_1.prisma.like.create({
                            data: {
                                postId,
                                userType: "AGRI_EXPERT",
                                agriExpertId: userId,
                            },
                        }),
                        client_1.prisma.post.update({
                            where: {
                                id: postId,
                            },
                            data: {
                                likeCount: { increment: 1 },
                            },
                        }),
                    ]);
                }
                return true;
            }
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = LikeService;
