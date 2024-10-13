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

export const getAllCommentsOfAPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postId = req.params.id;
    if (!postId) {
      res.status(StatusCodes.BAD_REQUEST).json({
        error: "postId is required",
      });
      return;
    }

    const response = await postService.getAllCommentsOfAPost(Number(postId));
    res.status(StatusCodes.OK).json({
      ok: true,
      response,
    });
  } catch (error) {
    next(error);
  }
};



export const getAPost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const postId = req.params.id;
      if (!postId) {
        res.status(StatusCodes.BAD_REQUEST).json({
          error: "postId is required",
        });
        return;
      }
  
      const response = await postService.getAPostDetails(Number(postId))
      res.status(StatusCodes.OK).json({
        ok: true,
        response,
      });
    } catch (error) {
      next(error);
    }
  };