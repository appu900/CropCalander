import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../prisma/client";
import { AuthenticatedRequest } from "src/middleware/authenticationMiddleware";

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

export const CrerateExpertVisitFormHandler = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Authorization required",
      });
    }
    const { farmLocation, cropType, AreainHector, Query } = req.body;

    const data = await prisma.expertVisit.create({
      data: {
        farmLocation,
        cropType,
        AreainHector,
        Query,
        farmerID: Number(userId),
      },
    });

    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const CreateSoilHealthMonitorHandler = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userID = req.userId;
    console.log(userID);
    if (!userID) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Authorization required",
      });
      return;
    }
    const { cropType, soilType, areaInHectares, query, farmLocation } =
      req.body;
    console.log(req.body);
    const response = await prisma.soilHealthMapForm.create({
      data: {
        cropType,
        soilType,
        areaInHectares: parseFloat(areaInHectares),
        query,
        farmerId: Number(userID),
        farmLoaction: farmLocation,
      },
    });

    console.log(response);

    res.status(StatusCodes.CREATED).json({
      message: "Soil health map form created successfully",
      response,
    });
  } catch (error: any) {
    console.log(error.message);
    next(error);
  }
};
