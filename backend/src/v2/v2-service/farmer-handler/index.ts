import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "../../../middleware/authenticationMiddleware";
import { prisma } from "../../../prisma/client";
import { StatusCodes } from "http-status-codes";

export const fetchAllCompletedCropCalander = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const farmerID = req.userId;
    const completedCropCalander = await prisma.cropCalandarRequest.findMany({
      where: {
        farmerId: farmerID,
        status: "COMPLETED",
        cropCalandar: {
          isNot: null,
        },
      },
      include: {
        cropCalandar: {
          include: {
            activities: true,
          },
        },
      },
    });
    res.status(StatusCodes.OK).json(completedCropCalander);
  } catch (error) {
    next(error);
  }
};

export const fetchAllCropCalanderRequest = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const farmerID = req.userId;
    const resquests = await prisma.cropCalandarRequest.findMany({
      where: {
        farmerId: farmerID,
      },
      include: {
        expert: true,
        cropCalandar: {
          include: {
            activities: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(StatusCodes.OK).json(resquests);
  } catch (error) {
    next(error);
  }
};
