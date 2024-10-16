import { EntityNotFoundError } from "../utils/application.errors";
import { prisma } from "../prisma/client";

class PostService {
  async getAllPosts() {
    try {
      const posts = await prisma.post.findMany({
        include: {
          comments: true,
          farmer:{
            select:{
              name:true,
              address:true
            }
          }
        },
      });
      return posts;
    } catch (error) {
      throw error;
    }
  }

  async getAllCommentsOfAPost(postId: number) {
    try {
      const comments = await prisma.comment.findMany({
        where: {
          postId,
        },
      });
      return comments;
    } catch (error) {
      throw error;
    }
  }

  async getAPostDetails(postId: number) {
    try {
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
        include: {
          comments: true,
        },
      });

      if (!post) {
        throw new EntityNotFoundError("post does not exists");
      }
      return post;
    } catch (error) {
      throw error;
    }
  }
}

export default PostService;
