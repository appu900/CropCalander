import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../prisma/client";

export const CreateFeedbackHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { star, feedbackCategory, feedbackContent } = req.body;
    const response = await prisma.feedback.create({
      data: {
        star: Number(star),
        feedbackCategory: feedbackCategory,
        feedback: feedbackContent,
      },
    });
    res.status(StatusCodes.CREATED).json({
      message: "thank you for your feedback",
    });
  } catch (error) {
    next(error);
  }
};

export const FetchAllFeedbackHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await prisma.feedback.findMany();
    res.status(StatusCodes.OK).json({
      message: "all feddback fetched sucessfully",
      response,
    });
  } catch (error) {
    next(error);
  }
};
