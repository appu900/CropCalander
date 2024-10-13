import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../middleware/authenticationMiddleware";
import { StatusCodes } from "http-status-codes";
import LikeService from "../services/Like";

const likeService = new LikeService();

export const likeAPost = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    const role = req.role;
    const postId = req.params.id;

    // handle edge cases
    if (!userId || !role || !postId) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        ok: false,
        error: "Unauthorized ateempt",
      });
      return;
    }

    const response = await likeService.toggleLike(
      Number(postId),
      Number(userId),
      role
    );

    res.status(StatusCodes.OK).json({
      ok: true,
      message: "Post Liked Successfully",
    });
  } catch (error) {
    next(error);
  }
};
