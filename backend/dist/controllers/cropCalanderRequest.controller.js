"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllpendingRequsts = exports.create = void 0;
const CropcalandarRequest_1 = __importDefault(require("../services/CropcalandarRequest"));
const http_status_codes_1 = require("http-status-codes");
const cropRequest = new CropcalandarRequest_1.default();
const create = async (req, res, next) => {
    try {
        const farmerId = req.userId;
        if (!farmerId) {
            res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                ok: false,
                message: "Unauthorized, no token provided",
            });
            return;
        }
        const payload = req.body;
        const response = await cropRequest.createCropCalanderRequest(farmerId, payload);
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            ok: true,
            response,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.create = create;
// ** get all pending Request..
const getAllpendingRequsts = async (req, res, next) => {
    try {
        const response = await cropRequest.getAllPendingCropCalanderRequest();
        res.status(http_status_codes_1.StatusCodes.OK).json({
            ok: true,
            response
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllpendingRequsts = getAllpendingRequsts;
