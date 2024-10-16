"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRequestStatus = void 0;
const client_1 = require("../prisma/client");
const http_status_codes_1 = require("http-status-codes");
const checkRequestStatus = async (req, res, next) => {
    try {
        const requestId = req.params.requestId;
        const cropCalandarReq = await client_1.prisma.cropCalandarRequest.findUnique({
            where: {
                id: Number(requestId),
            },
        });
        if (!cropCalandarReq) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                ok: false,
                message: "Request not found",
            });
            return;
        }
        if (cropCalandarReq.status === "ACCEPTED") {
            res.status(http_status_codes_1.StatusCodes.CONFLICT).json({
                ok: false,
                message: "Request already accepted",
            });
            return;
        }
        next();
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.BAD_GATEWAY).json({
            ok: false,
            message: "Something went wrong",
        });
        return;
    }
};
exports.checkRequestStatus = checkRequestStatus;
