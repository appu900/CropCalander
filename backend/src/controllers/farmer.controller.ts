import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import {
  CreateFarmerDTO,
  FarmerCropCalendarActivityDTO,
  FarmerCropCalendarCreationDTO,
  FarmerLoginDTO,
  FarmerResponseDTO,
} from "../dtos/farmer.dto";
import FarmerService from "../services/farmer";
import { CustomError } from "../utils/application.errors";
import { AuthenticatedRequest } from "../middleware/authenticationMiddleware";
import CropCalanderRequestService from "../services/CropcalandarRequest";
const farmerService = new FarmerService();
const cropCalendarRequestService = new CropCalanderRequestService();

// ** purpose : create a new farmer

export async function createFarmer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const createFarmerPayload = req.body as CreateFarmerDTO;
    const response: FarmerResponseDTO = await farmerService.createFarmer(
      createFarmerPayload
    );
    res.status(StatusCodes.CREATED).json({
      ok: true,
      response,
    });
  } catch (error: any) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({
        ok: false,
        message: error.message,
      });
    }

    next(error);
  }
}

// ** purpose : login a farmer

export async function farmerLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const loginPayload = req.body as FarmerLoginDTO;
    const response: FarmerResponseDTO = await farmerService.farmerLogin(
      loginPayload
    );
    res.status(StatusCodes.OK).json({
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
}

export const getAllCropCalendarRequestForFarmer = async (
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
    const response =
      await farmerService.getALLCropCalendarOfFarmer(
        farmerId
      );
    res.status(StatusCodes.OK).json({
      ok: true,
      response,
    });
  } catch (error) {
    next(error);
  }
};

export const handleAllCompletedCropcalendarRequest = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const farmerId: number | undefined = req.userId;
    if (!farmerId) {
      res.status(StatusCodes.BAD_REQUEST).json({
        ok: false,
        error: "UnAuthorized request",
      });
      return;
    }

    const response =
      await cropCalendarRequestService.findCropCalendarRequestWithStatusCompleted(
        farmerId
      );
    res.status(StatusCodes.OK).json({
      ok: true,
      response,
    });
  } catch (error) {
    next(error);
  }
};

// ** purpose : create a new crop calendar for farmer

export const createOwnCropCalendar = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const farmerId = req.userId;
    const payload: FarmerCropCalendarCreationDTO = req.body;
    if (!farmerId) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        ok: false,
        message: "Unauthorized, no token provided",
      });
      return;
    }
    const response = await farmerService.createOwnCropCalendar(
      payload,
      farmerId
    );
    res.status(StatusCodes.CREATED).json({
      ok: true,
      response,
    });
  } catch (error) {
    next(error);
  }
};

// ** purpose : add activity to crop calendar of farmer

export const addActivityToFarmerCropCalendar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cropCalendarId = parseInt(req.params.id);
    const payload:FarmerCropCalendarActivityDTO = req.body;
    const response = await farmerService.addActivityToCropcalendar(payload,cropCalendarId);
    res.status(StatusCodes.CREATED).json({
      ok:true,
      response
    })
  } catch (error) {
    if(error instanceof CustomError){
      res.status(error.statusCode).json({
        ok:false,
        message:error.message
      })
    }
    next(error)
  }
};


export const getAllCropCalendarsOfFarmer = async (req:AuthenticatedRequest,res:Response,next:NextFunction) =>{
  try {
    const farmerId:number | undefined = req.userId;
    if(!farmerId){
      res.status(StatusCodes.UNAUTHORIZED).json({
        ok:false,
        message:"Unauthorized, no token provided"
      })
      return;
    }
    const response = await farmerService.getALLCropCalendarOfFarmer(farmerId);
    res.status(StatusCodes.OK).json({
      ok:true,
      response
    })
  } catch (error) {
    next(error)
  }
}
