"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];
        if (!token) {
            res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                ok: false,
                message: "Unauthorized, no token provided",
            });
            return;
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, "hello world"); // Cast to JwtPayload
        if (!decodedToken || !decodedToken.userId) {
            res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                ok: false,
                message: "Invalid token",
            });
            return;
        }
        // Add userId to the request object
        req.userId = Number(decodedToken.userId);
        req.role = decodedToken.role; // Assuming userId is part of the token payload
        next();
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            ok: false,
            message: "Unauthorized, token verification failed",
        });
        return;
    }
};
exports.authMiddleware = authMiddleware;
