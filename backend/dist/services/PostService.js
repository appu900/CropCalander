"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const application_errors_1 = require("../utils/application.errors");
const client_1 = require("../prisma/client");
class PostService {
    async getAllPosts() {
        try {
            const posts = await client_1.prisma.post.findMany({
                include: {
                    comments: true,
                    farmer: {
                        select: {
                            name: true,
                            address: true
                        }
                    }
                },
            });
            return posts;
        }
        catch (error) {
            throw error;
        }
    }
    async getAllCommentsOfAPost(postId) {
        try {
            const comments = await client_1.prisma.comment.findMany({
                where: {
                    postId,
                },
            });
            return comments;
        }
        catch (error) {
            throw error;
        }
    }
    async getAPostDetails(postId) {
        try {
            const post = await client_1.prisma.post.findUnique({
                where: {
                    id: postId,
                },
                include: {
                    comments: true,
                },
            });
            if (!post) {
                throw new application_errors_1.EntityNotFoundError("post does not exists");
            }
            return post;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = PostService;
