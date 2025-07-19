import express, { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { GenerateOTP } from "../Farmer";
import { prisma } from "../../../prisma/client";
import { sendOTP } from "../../../utils/OTP-handler";
import { generateToken } from "../../../utils/token.utils";

export const AuthenticateExpert = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { phoneNumber, otp } = req.body;
    if (!phoneNumber || !otp) {
      res.status(StatusCodes.BAD_REQUEST).json({
        Status: "Validation Error",
        message: "all feilds are required",
      });
      return;
    }
    const expert = await prisma.agriExpert.findUnique({
      where: {
        phoneNumber,
      },
    });
    if (
      !expert ||
      !expert.Otp ||
      !expert.OtpExpireTime ||
      new Date() > expert.OtpExpireTime
    ) {
      res.status(StatusCodes.BAD_REQUEST).json({
        Status: "Error",
        message: "OTP Expired",
      });
      return;
    }

    const token = generateToken(expert?.id, expert.role);
    res.status(StatusCodes.OK).json({
      Status: "Account Verification Sucessfull",
      token: token,
      role: expert.role,
      name: expert.name,
    });
  } catch (error) {
    next(error);
  }
};

export const handleExpertAuthRegistrationHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, phoneNumber, email } = req.body;
    if (!username || !phoneNumber || !email) {
      res.status(StatusCodes.BAD_REQUEST).json({
        Status: "Data Validation Error",
        message: "Invalid request Payload",
      });
      return;
    }
    const OTP = GenerateOTP();
    const existingExpert = await prisma.agriExpert.findUnique({
      where: {
        phoneNumber,
      },
    });
    if (existingExpert) {
      await prisma.agriExpert.update({
        where: { id: existingExpert.id },
        data: {
          Otp: OTP.otp,
          OtpExpireTime: OTP.otpExpiresAt,
        },
      });
    } else {
      await prisma.agriExpert.create({
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
    await sendOTP(phoneNumber, OTP.otp);
    res.status(StatusCodes.OK).json({
      Status: "Success",
      message: "OTP sent sucessfully",
    });
  } catch (error) {
    next(error);
  }
};
