import { Request, Response, NextFunction } from "express";
import CropCelendarService from "../services/Cropcalendar";
import { AuthenticatedRequest } from "../middleware/authenticationMiddleware";
import { CustomError } from "../utils/application.errors";
import { CropCalendarActivityDTO } from "../dtos/Cropcalendar";
import { StatusCodes } from "http-status-codes";
import {z} from "zod";
import { cropCalendarActivitySchema } from "../validation/cropcalendarActivitySchema";

const cropCalendarService = new CropCelendarService();

const bulkCropCalendarActivitySchema = z.object({
  activities:z.array(cropCalendarActivitySchema)
})

export const generateCropCalendar = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const requestId = req.params.requestId;
    const expertId: number | undefined = req.userId;
    if (!expertId) {
      res.status(401).json({
        ok: false,
        message: "Unauthorized, no token provided",
      });
      return;
    }
    const response = await cropCalendarService.createCropCalendar(
      Number(requestId),
      expertId
    );
    res.status(201).json({
      ok: true,
      response,
    });
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({
        ok: false,
        message: error.message,
      });
    }
    next(error);
  }
};

export const addAcitivity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const activityPayload:CropCalendarActivityDTO[] = req.body.activities;
    const cropCalendarId = req.params.cropCalendarId;
    const validatePayload = bulkCropCalendarActivitySchema.parse(req.body);
    const response = await cropCalendarService.createActivities(Number(cropCalendarId),validatePayload.activities);
    res.status(StatusCodes.CREATED).json({
      ok:true,
      response
    })
  } catch (error) {
    if(error instanceof z.ZodError){
      res.status(StatusCodes.BAD_REQUEST).json({
        ok:false,
        message:"validation failed",
        error:error.errors
      })
    }
    next(error);
  }
};
