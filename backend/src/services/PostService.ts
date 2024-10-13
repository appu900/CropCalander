import { prisma } from "../prisma/client";

class PostService {
  async getAllPosts() {
    try {
      const posts = await prisma.post.findMany();
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
}

export default PostService;
