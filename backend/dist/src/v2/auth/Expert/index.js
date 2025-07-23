"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpertLogin = exports.handleExpertAuthRegistrationHandler = exports.AuthenticateExpert = void 0;
const http_status_codes_1 = require("http-status-codes");
const Farmer_1 = require("../Farmer");
const client_1 = require("../../../prisma/client");
const OTP_handler_1 = require("../../../utils/OTP-handler");
const token_utils_1 = require("../../../utils/token.utils");
const AuthenticateExpert = async (req, res, next) => {
    try {
        const { phoneNumber, otp } = req.body;
        if (!phoneNumber || !otp) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                Status: "Validation Error",
                message: "all feilds are required",
            });
            return;
        }
        const expert = await client_1.prisma.agriExpert.findUnique({
            where: {
                phoneNumber,
            },
        });
        if (!expert ||
            !expert.Otp ||
            !expert.OtpExpireTime ||
            new Date() > expert.OtpExpireTime ||
            otp !== expert.Otp) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                Status: "Error",
                message: "Invaid otp",
            });
            return;
        }
        const token = (0, token_utils_1.generateToken)(expert?.id, expert.role);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            Status: "Account Verification Sucessfull",
            token: token,
            role: expert.role,
            name: expert.name,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.AuthenticateExpert = AuthenticateExpert;
const handleExpertAuthRegistrationHandler = async (req, res, next) => {
    try {
        const { username, phoneNumber, email } = req.body;
        if (!username || !phoneNumber || !email) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                Status: "Data Validation Error",
                message: "Invalid request Payload",
            });
            return;
        }
        const OTP = (0, Farmer_1.GenerateOTP)();
        const existingExpert = await client_1.prisma.agriExpert.findUnique({
            where: {
                phoneNumber,
            },
        });
        if (existingExpert) {
            await client_1.prisma.agriExpert.update({
                where: { id: existingExpert.id },
                data: {
                    Otp: OTP.otp,
                    OtpExpireTime: OTP.otpExpiresAt,
                },
            });
        }
        else {
            await client_1.prisma.agriExpert.create({
                data: {
                    phoneNumber,
                    name: username,
                    password: "",
                    Otp: OTP.otp,
                    OtpExpireTime: OTP.otpExpiresAt,
                    email: email,
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
exports.handleExpertAuthRegistrationHandler = handleExpertAuthRegistrationHandler;
const ExpertLogin = async (req, res, next) => {
    try {
        console.log("hello world brother");
    }
    catch (error) {
        next(error);
    }
};
exports.ExpertLogin = ExpertLogin;
