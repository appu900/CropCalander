import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { CreateFarmerDTO, FarmerResponseDTO } from "../dtos/farmer.dto";
import FarmerService from "../services/farmer";
import { CustomError } from "../utils/application.errors";
const farmerService = new FarmerService();

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
