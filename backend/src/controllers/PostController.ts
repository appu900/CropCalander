import { NextFunction, Request, Response } from "express";
import PostService from "../services/PostService";
import { StatusCodes } from "http-status-codes";

const postService = new PostService();

export const getAllPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await postService.getAllPosts();
    res.status(StatusCodes.OK).json({
      ok: true,
      response,
    });
  } catch (error) {
    next(error);
  }
};
