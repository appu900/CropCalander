import { StatusCodes } from "http-status-codes";
import {
  AgriExpertLoginRequestDTO,
  AgriExpertRequestDto,
  AgriExpertResponseDto,
} from "../dtos/Agriexpert.dto";
import AgriExpertService from "../services/AgriExpert";
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/application.errors";
import { AuthenticatedRequest } from "../middleware/authenticationMiddleware";
const agriExpertService = new AgriExpertService();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = req.body as AgriExpertRequestDto;
    const response: AgriExpertResponseDto =
      await agriExpertService.createAgriExpert(payload);
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
