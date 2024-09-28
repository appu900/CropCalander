import { StatusCodes } from "http-status-codes";
import {
  AgriExpertRequestDto,
  AgriExpertResponseDto,
} from "../dtos/Agriexpert.dto";
import AgriExpertService from "../services/AgriExpert";
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/application.errors";
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
  } catch (error:any) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({
        ok: false,
        message: error.message,
      });
    }
    next(error);
  }
};
