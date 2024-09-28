import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import {
  CreateFarmerDTO,
  FarmerLoginDTO,
  FarmerResponseDTO,
} from "../dtos/farmer.dto";
import FarmerService from "../services/farmer";
import { CustomError } from "../utils/application.errors";
const farmerService = new FarmerService();

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
