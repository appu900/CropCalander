import { Response, NextFunction } from "express";
import { prisma } from "../prisma/client";
import { AuthenticatedRequest } from "./authenticationMiddleware";
import { StatusCodes } from "http-status-codes";

export const checkRequestStatus = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const requestId = req.params.requestId;
    const cropCalandarReq = await prisma.cropCalandarRequest.findUnique({
      where: {
        id: Number(requestId),
      },
    });
    if (!cropCalandarReq) {
      res.status(StatusCodes.NOT_FOUND).json({
        ok: false,
        message: "Request not found",
      });
      return;
    }
    if (cropCalandarReq.status === "ACCEPTED") {
      res.status(StatusCodes.CONFLICT).json({
        ok: false,
        message: "Request already accepted",
      });
      return;
    }
    next();
  } catch (error) {
    res.status(StatusCodes.BAD_GATEWAY).json({
      ok: false,
      message: "Something went wrong",
    });
    return;
  }
};
