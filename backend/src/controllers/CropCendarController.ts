import { Request, Response, NextFunction } from "express";
import CropCelendarService from "../services/Cropcalendar";
import { AuthenticatedRequest } from "../middleware/authenticationMiddleware";
import { CustomError } from "../utils/application.errors";

const cropCalendarService = new CropCelendarService();

export const generateCropCalendar = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const requestId = req.params.requestId;
    const expertId:number | undefined= req.userId;
    if(!expertId){
      res.status(401).json({
        ok:false,
        message:"Unauthorized, no token provided"
      })
      return;
    }
    const response = await cropCalendarService.createCropCalendar(Number(requestId),expertId);
    res.status(201).json({
      ok: true,
      response,
    });
  } catch (error) {
    if(error instanceof CustomError){
        res.status(error.statusCode).json({
            ok:false,
            message:error.message
        })
    }
    next(error);
  }
};
