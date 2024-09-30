import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  userId?: number;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers["x-access-token"] as string;
    if (!token) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        ok: false,
        message: "Unauthorized, no token provided",
      });
      return;
    }

    const decodedToken = jwt.verify(token, "hello world") as JwtPayload; // Cast to JwtPayload

    if (!decodedToken || !decodedToken.userId) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        ok: false,
        message: "Invalid token",
      });
      return;
    }

    // Add userId to the request object

    (req as AuthenticatedRequest).userId = Number(decodedToken.userId); // Assuming userId is part of the token payload
    next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      ok: false,
      message: "Unauthorized, token verification failed",
    });
    return;
  }
};
