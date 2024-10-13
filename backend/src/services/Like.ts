import { prisma } from "../prisma/client";

class LikeService {
  /**
   *  first find existing like
   *  if there is like thn do unlike
   *  if unlike thn do like
   *  FARMER
      AGRI_EXPERT
   * */
  async toggleLike(postId: number, userId: number, role: string) {
    try {
      let existingLike;
      if (role === "FARMER") {
        existingLike = await prisma.like.findFirst({
          where: {
            postId,
            farmerId: userId,
          },
        });
      } else if (role === "AGRI_EXPERT") {
        existingLike = await prisma.like.findFirst({
          where: {
            postId,
            agriExpertId: userId,
          },
        });
      }

      if (existingLike) {
        await prisma.$transaction([
          prisma.like.delete({
            where: {
              id: existingLike.id,
            },
          }),

          prisma.post.update({
            where: { id: postId },
            data: { likeCount: { decrement: 1 } },
          }),
        ]);

        return true;
      } else {
        // ** if liked by farmer
        if (role === "FARMER") {
          await prisma.$transaction([
            prisma.like.create({
              data: {
                postId,
                farmerId: userId,
                userType: "FARMER",
              },
            }),

            prisma.post.update({
              where: { id: postId },
              data: {
                likeCount: { increment: 1 },
              },
            }),
          ]);
        } else if (role === "AGRI_EXPERT") {
          await prisma.$transaction([
            prisma.like.create({
              data: {
                postId,
                userType: "AGRI_EXPERT",
                agriExpertId: userId,
              },
            }),

            prisma.post.update({
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
    } catch (error) {
      throw error;
    }
  }
}

export default LikeService;
