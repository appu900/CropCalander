declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        ok: false,
        message: "Unauthorized, no token provided",
      });
    }

    const decodedToken = jwt.verify(token, "hello world") as JwtPayload; // Cast to JwtPayload

    if (!decodedToken || !decodedToken.userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        ok: false,
        message: "Invalid token",
      });
    }

    req.userId = Number(decodedToken.userId); // Assuming userId is part of the token payload
    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      ok: false,
      message: "Unauthorized, token verification failed",
    });
  }
};
