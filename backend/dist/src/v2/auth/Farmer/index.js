"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginFarmer = exports.handleFarmerAuthRegistrationHandler = exports.AuthenticateFarmer = exports.RegenerateOTP = exports.GenerateOTP = void 0;
const http_status_codes_1 = require("http-status-codes");
const client_1 = require("../../../prisma/client");
const OTP_handler_1 = require("../../../utils/OTP-handler");
const token_utils_1 = require("../../../utils/token.utils");
const GenerateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 2 * 60 * 1000);
    const OTP_Object = {
        otpExpiresAt,
        otp,
    };
    return OTP_Object;
};
exports.GenerateOTP = GenerateOTP;
const RegenerateOTP = async (req, res, next) => {
    try {
        const { phoneNumber, role } = req.body;
        if (!phoneNumber || !role) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                Status: "Validation Error",
                message: "Invalid req body Payload",
            });
            return;
        }
        const otpObject = (0, exports.GenerateOTP)();
        if (role === "FARMER") {
            const farmer = await client_1.prisma.farmer.findUnique({ where: { phoneNumber } });
            if (!farmer) {
                res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                    Status: "Not Found Error",
                    message: "no farmer found with this phonenumber",
                });
                return;
            }
            await client_1.prisma.farmer.update({
                where: { phoneNumber: phoneNumber },
                data: { Otp: otpObject.otp, OtpExpireTime: otpObject.otpExpiresAt },
            });
        }
        else if (role === "EXPERT") {
            const expert = await client_1.prisma.agriExpert.findUnique({
                where: { phoneNumber },
            });
            if (!expert) {
                res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                    Status: "Not Found Error",
                    message: "No user found with this phone number",
                });
                return;
            }
            await client_1.prisma.agriExpert.update({
                where: { phoneNumber: phoneNumber },
                data: { Otp: otpObject.otp, OtpExpireTime: otpObject.otpExpiresAt },
            });
        }
        await (0, OTP_handler_1.sendOTP)(phoneNumber, otpObject.otp);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            Status: "Success",
            message: "Otp sent sucessfully",
        });
        return;
    }
    catch (error) {
        next(error);
    }
};
exports.RegenerateOTP = RegenerateOTP;
const AuthenticateFarmer = async (req, res, next) => {
    try {
        const { phoneNumber, otp } = req.body;
        if (!phoneNumber || !otp) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                Status: "Validation Error",
                message: "all feilds are required",
            });
            return;
        }
        const farmer = await client_1.prisma.farmer.findUnique({
            where: {
                phoneNumber,
            },
        });
        if (!farmer ||
            !farmer.Otp ||
            !farmer.OtpExpireTime ||
            new Date() > farmer.OtpExpireTime ||
            otp !== farmer.Otp) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                Status: "Error",
                message: "Invalid OTP",
            });
            return;
        }
        const token = (0, token_utils_1.generateToken)(farmer.id, farmer.role);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            Status: "Account Verification Sucessfull",
            token: token,
            role: farmer.role,
            name: farmer.name,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.AuthenticateFarmer = AuthenticateFarmer;
const handleFarmerAuthRegistrationHandler = async (req, res, next) => {
    try {
        const { username, phoneNumber } = req.body;
        if (!username || !phoneNumber) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                Status: "Data Validation Error",
                message: "Invalid request Payload",
            });
            return;
        }
        const OTP = (0, exports.GenerateOTP)();
        const existingFarmer = await client_1.prisma.farmer.findUnique({
            where: {
                phoneNumber,
            },
        });
        if (existingFarmer) {
            await client_1.prisma.farmer.update({
                where: { id: existingFarmer.id },
                data: {
                    Otp: OTP.otp,
                    OtpExpireTime: OTP.otpExpiresAt,
                },
            });
        }
        else {
            await client_1.prisma.farmer.create({
                data: {
                    phoneNumber,
                    name: username,
                    password: "",
                    Otp: OTP.otp,
                    OtpExpireTime: OTP.otpExpiresAt,
                },
            });
        }
        await (0, OTP_handler_1.sendOTP)(phoneNumber, OTP.otp);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            Status: "Success",
            message: "OTP sent sucessfully",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.handleFarmerAuthRegistrationHandler = handleFarmerAuthRegistrationHandler;
const LoginFarmer = async (req, res, next) => {
    try {
        const { phoneNumber } = req.body;
        if (!phoneNumber) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                Status: "Validation Error",
                message: "all fields are required",
            });
            return;
        }
        const farmer = await client_1.prisma.farmer.findUnique({
            where: {
                phoneNumber,
            },
        });
        if (!farmer) {
            res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                Status: "Error",
                message: "Invalid phone number",
            });
            return;
        }
        const OTP = (0, exports.GenerateOTP)();
        await client_1.prisma.farmer.update({
            where: { id: farmer.id },
            data: { Otp: OTP.otp, OtpExpireTime: OTP.otpExpiresAt },
        });
        await (0, OTP_handler_1.sendOTP)(phoneNumber, OTP.otp);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            Status: "Success",
            message: "OTP sent successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.LoginFarmer = LoginFarmer;
