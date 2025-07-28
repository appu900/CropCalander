import { AuthenticatedRequest } from "../middleware/authenticationMiddleware";
import {
  CropCalanderRequestDTO,
  CropCalendarReqResponseDTO,
} from "../dtos/CropcalanderRequest";
import CropCalanderRequestService from "../services/CropcalandarRequest";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { validateDTO } from "../middleware/validate.dto";
import { prisma } from "../prisma/client";
const cropRequest = new CropCalanderRequestService();

export const create = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const farmerId: number | undefined = req.userId;
    if (!farmerId) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        ok: false,
        message: "Unauthorized, no token provided",
      });
      return;
    }
    const payload: CropCalanderRequestDTO = req.body;
    const response = await cropRequest.createCropCalanderRequest(
      farmerId,
      payload
    );
    res.status(StatusCodes.CREATED).json({
      ok: true,
      response,
    });
  } catch (error) {
    next(error);
  }
};

// ** get all pending Request..
export const getAllpendingRequsts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response: CropCalendarReqResponseDTO[] =
      await cropRequest.getAllPendingCropCalanderRequest();
    res.status(StatusCodes.OK).json({
      ok: true,
      response,
    });
  } catch (error) {
    next(error);
  }
};

export const changeStatusToComplete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cropCalanderID = req.body.id;
    const cropCalender = await prisma.cropCalendar.findUnique({
      where: {
        id: cropCalanderID,
      },
      select: { requestId: true },
    });
    if (!cropCalender) {
      res.status(400).json({ error: "not found" });
    }
    const updatedRequest = await prisma.cropCalandarRequest.update({
      where: { id: cropCalender?.requestId },
      data: {
        status: "COMPLETED",
      },
    });
    res.status(200).json({
      status: "true",
    });
  } catch (error) {
    next(error);
  }
};

export const fetchAllCompletedCropCalanderforFramer = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const farmerID = req.userId;
    const response = await prisma.cropCalendar.findMany({
      where: {
        farmerRequest: {
          farmerId: farmerID,
          status: "COMPLETED",
        },
      },
      include: {
        farmerRequest: true,
        activities: true,
      },
    });
    res.status(StatusCodes.OK).json(response);
  } catch (error) {
    next(error);
  }
};
