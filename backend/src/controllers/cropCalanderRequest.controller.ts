import { AuthenticatedRequest } from "../middleware/authenticationMiddleware";
import { CropCalanderRequestDTO } from "../dtos/CropcalanderRequest";
import CropCalanderRequestService from "../services/CropcalandarRequest";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { validateDTO } from "../middleware/validate.dto";
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
