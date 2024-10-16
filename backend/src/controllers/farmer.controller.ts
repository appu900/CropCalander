import { StatusCodes } from "http-status-codes";
import { z } from "zod";
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
import multer from "multer";
import sharp from "sharp";
import { uploadToS3 } from "../config/s3.config";
import { createFarmerSchema } from "../validation/createFarmerValidaton";
import { DroneSprayingFormDTO, SmartIrrigationFormDto, SoilHealthMapFormDto } from "../dtos/ServiceForms.dto";
const farmerService = new FarmerService();
const cropCalendarRequestService = new CropCalanderRequestService();

const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB file size limit

// ** purpose : create a new farmer

export async function createFarmer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // ** validate the request

    const validatePayload = createFarmerSchema.parse(req.body);
    const createFarmerPayload = req.body as CreateFarmerDTO;
    if (req.file) {
      const fileName = `${Date.now()}-${req.file.originalname}`;
      let optimizedBuffer: Buffer | null = await sharp(req.file.buffer)
        .resize(1024)
        .toBuffer();
      const fileUrl = await uploadToS3(
        optimizedBuffer,
        fileName,
        req.file.mimetype
      );
      createFarmerPayload.profilePic = fileUrl;
      optimizedBuffer = null;
    }

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
    } else if (error instanceof z.ZodError) {
      res.status(StatusCodes.BAD_REQUEST).json({
        ok: false,
        error: error.errors,
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
    const response = await farmerService.getALLCropCalendarOfFarmer(farmerId);
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
    const payload: FarmerCropCalendarActivityDTO = req.body;
    const response = await farmerService.addActivityToCropcalendar(
      payload,
      cropCalendarId
    );
    res.status(StatusCodes.CREATED).json({
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

export const getAllCropCalendarsOfFarmer = async (
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
    const response = await farmerService.getALLCropCalendarOfFarmer(farmerId);
    res.status(StatusCodes.OK).json({
      ok: true,
      response,
    });
  } catch (error) {
    next(error);
  }
};

// **make a  post for social media feed

export const makeAPost = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    const postContent = req.body.content;
    if (postContent.length < 10) {
      res.status(StatusCodes.BAD_REQUEST).json({
        ok: false,
        error: "the caption should be atlest 10 character",
      });
    }
    if (!userId) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        ok: false,
        error: "unauthotized attempt",
      });
      return;
    }
    let fileUrl = "";
    if (req.file) {
      const fileName = `${Date.now()}-${req.file.originalname}`;
      let optimizedBuffer: Buffer | null = await sharp(req.file.buffer)
        .resize(1024)
        .toBuffer();
      fileUrl = await uploadToS3(optimizedBuffer, fileName, req.file.mimetype);
    }

    const response = await farmerService.createPost(
      postContent,
      fileUrl,
      userId
    );

    res.status(StatusCodes.CREATED).json({
      ok: true,
      response,
    });
  } catch (error) {
    next(error);
  }
};



export const makeApostViaActivity = async (req:AuthenticatedRequest,res:Response,next:NextFunction) =>{
  try {
    const content = req.body.caption;
    const activityId = parseInt(req.params.id);
    const farmerId = req.userId;

    if(!farmerId || !activityId || !content){
      res.status(StatusCodes.BAD_REQUEST).json({
        ok:false,
        error:"invalid request"
      })
      return;
    }

    console.log(content,activityId,farmerId);
    let fileUrl = "";
    if (req.file) {
      const fileName = `${Date.now()}-${req.file.originalname}`;
      let optimizedBuffer: Buffer | null = await sharp(req.file.buffer)
        .resize(1024)
        .toBuffer();
      fileUrl = await uploadToS3(
        optimizedBuffer,
        fileName,
        req.file.mimetype
      );
      optimizedBuffer = null;
    }
      
    

    const response = await farmerService.updateImageToActivity(fileUrl,content,activityId,Number(farmerId));
    res.status(StatusCodes.CREATED).json({
      ok:true,
      response
    })
  } catch (error) {
     next(error)
  }
}



export const createSmartIrrigationForm = async(req:AuthenticatedRequest,res:Response,next:NextFunction) =>{
  try {
    const farmerId = req.userId;
    if(!farmerId){
      res.status(StatusCodes.BAD_REQUEST).json({
        ok:false,
        error:"Unauthorized request"
      })
      return;
    }
    const payload:SmartIrrigationFormDto = req.body;
    const response = await farmerService.createSmartIrrigationFrom(Number(farmerId),payload);
    res.status(StatusCodes.CREATED).json({
      ok:true,
      response
    })
  } catch (error) {
    next(error)
  }
}

export const createDroneSprayingnForm = async(req:AuthenticatedRequest,res:Response,next:NextFunction) =>{
  try {
    const farmerId = req.userId;
    if(!farmerId){
      res.status(StatusCodes.BAD_REQUEST).json({
        ok:false,
        error:"Unauthorized request"
      })
      return;
    }
    const payload:DroneSprayingFormDTO = req.body;
    const response = await farmerService.createDroneSprayingForm(Number(farmerId),payload);
    res.status(StatusCodes.CREATED).json({
      ok:true,
      response
    })
  } catch (error) {
    next(error)
  }
}


export const createDigitalSoilHealthForm = async(req:AuthenticatedRequest,res:Response,next:NextFunction) =>{
  try {
    const farmerId = req.userId;
    if(!farmerId){
      res.status(StatusCodes.BAD_REQUEST).json({
        ok:false,
        error:"Unauthorized request"
      })
      return;
    }
    const payload:SoilHealthMapFormDto = req.body;
    const response = await farmerService.createSoilHealthMapForm(Number(farmerId),payload);
    res.status(StatusCodes.CREATED).json({
      ok:true,
      response
    })
  } catch (error) {
    next(error)
  }
}

