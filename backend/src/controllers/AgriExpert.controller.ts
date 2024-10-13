import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import {
  AgriExpertLoginRequestDTO,
  AgriExpertRequestDto,
  AgriExpertResponseDto,
} from "../dtos/Agriexpert.dto";
import AgriExpertService from "../services/AgriExpert";
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/application.errors";
import { AuthenticatedRequest } from "../middleware/authenticationMiddleware";
import { agriExpertValidationSchema } from "../validation/agriExpertValidation";
import { uploadToS3 } from "../config/s3.config";
import sharp from "sharp";
const agriExpertService = new AgriExpertService();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = req.body;
    const validatePayload = agriExpertValidationSchema.parse(payload);
    let fileUrl = "";
    if (req.file) {
      const fileName = `${Date.now()}-${req.file.originalname}`;
      let optimizedBuffer: Buffer | null = await sharp(req.file.buffer)
        .resize(1024)
        .toBuffer();
      fileUrl = await uploadToS3(optimizedBuffer, fileName, req.file.mimetype);
      optimizedBuffer = null;
    }
    const createAgriExperPayload: AgriExpertRequestDto = {
      ...payload,
      profilePic: fileUrl,
    };
    const response: AgriExpertResponseDto =
      await agriExpertService.createAgriExpert(createAgriExperPayload);
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
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = req.body as AgriExpertLoginRequestDTO;
    const response: AgriExpertResponseDto =
      await agriExpertService.agriExpertLogin(payload);
    res.status(StatusCodes.OK).json({
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
};

export const acceptAgriExpertRequest = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const expertId: number | undefined = req.userId;
    if (!expertId) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        ok: false,
        message: "Unauthorized, no token provided",
      });
      return;
    }
    const requestId = req.params.requestId;
    const response = await agriExpertService.acceptRequest(
      expertId,
      Number(requestId)
    );
    res.status(StatusCodes.ACCEPTED).json({
      ok: true,
      response,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllRequestByAgriexpert = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const agriexpertId: number | undefined = req.userId;
    if (!agriexpertId) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        ok: false,
        message: "Unauthorized, no token provided",
      });
      return;
    }
    const response = await agriExpertService.getRequestsByExpertId(
      agriexpertId
    );
    res.status(StatusCodes.OK).json({
      ok: true,
      response,
    });
  } catch (error) {
    next(error);
  }
};

// ** make a post for feed

export const craeteAPost = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: number | undefined = req.userId;

    // ** handle UserId 
    if (!userId) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        ok: false,
        message: "Unauthorized, no token provided",
      });
      return;
    }

    // ** handle file upload
    let fileUrl = "";
    if (req.file) {
      const fileName = `${Date.now()}-${req.file.originalname}`;
      let optimizedBuffer: Buffer | null = await sharp(req.file.buffer)
        .resize(1024)
        .toBuffer();
      fileUrl = await uploadToS3(optimizedBuffer, fileName, req.file.mimetype);
      optimizedBuffer = null;
    }

    // ** handle post content
    const postContent = req.body.content;
    if (postContent.length < 10) {
      res.status(StatusCodes.BAD_REQUEST).json({
        ok: false,
        error: "the caption should be atlest 10 character",
      });
      return;
    }

    // ** make a post
    const response = await agriExpertService.makeAPost(
      postContent,
      fileUrl,
      userId
    );

    // ** send response
    res.status(StatusCodes.CREATED).json({
      ok: true,
      response,
    });
  } catch (error) {
    next(error);
  }
};
