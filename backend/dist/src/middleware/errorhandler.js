"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const errorHandler = (error, req, res, next) => {
    console.log(error.stack);
    res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
        ok: false,
        message: error.message || "An unexpected error occurred",
    });
};
exports.errorHandler = errorHandler;
