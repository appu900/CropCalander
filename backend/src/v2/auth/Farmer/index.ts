import express, { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../../../prisma/client";
import { sendOTP } from "../../../utils/OTP-handler";
import { generateToken } from "../../../utils/token.utils";

export const GenerateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiresAt = new Date(Date.now() + 2 * 60 * 1000);
  const OTP_Object = {
    otpExpiresAt,
    otp,
  };
  return OTP_Object;
};

export const RegenerateOTP = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { phoneNumber, role } = req.body;
    if (!phoneNumber || !role) {
      res.status(StatusCodes.BAD_REQUEST).json({
        Status: "Validation Error",
        message: "Invalid req body Payload",
      });
      return;
    }
    const otpObject = GenerateOTP();
    if (role === "FARMER") {
      const farmer = await prisma.farmer.findUnique({ where: { phoneNumber } });
      if (!farmer) {
        res.status(StatusCodes.NOT_FOUND).json({
          Status: "Not Found Error",
          message: "no farmer found with this phonenumber",
        });
        return;
      }
      await prisma.farmer.update({
        where: { phoneNumber: phoneNumber },
        data: { Otp: otpObject.otp, OtpExpireTime: otpObject.otpExpiresAt },
      });
    } else if (role === "EXPERT") {
      const expert = await prisma.agriExpert.findUnique({
        where: { phoneNumber },
      });
      if (!expert) {
        res.status(StatusCodes.NOT_FOUND).json({
          Status: "Not Found Error",
          message: "No user found with this phone number",
        });
        return;
      }
      await prisma.agriExpert.update({
        where: { phoneNumber: phoneNumber },
        data: { Otp: otpObject.otp, OtpExpireTime: otpObject.otpExpiresAt },
      });
    }
    await sendOTP(phoneNumber, otpObject.otp);
    res.status(StatusCodes.OK).json({
      Status: "Success",
      message: "Otp sent sucessfully",
    });
    return;
  } catch (error) {
    next(error);
  }
};

export const AuthenticateFarmer = async (
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
    const farmer = await prisma.farmer.findUnique({
      where: {
        phoneNumber,
      },
    });
    if (
      !farmer ||
      !farmer.Otp ||
      !farmer.OtpExpireTime ||
      new Date() > farmer.OtpExpireTime ||
      otp !== farmer.Otp
    ) {
      res.status(StatusCodes.BAD_REQUEST).json({
        Status: "Error",
        message: "Invalid OTP",
      });
      return;
    }

    const token = generateToken(farmer.id, farmer.role);
    res.status(StatusCodes.OK).json({
      Status: "Account Verification Sucessfull",
      token: token,
      role: farmer.role,
      name: farmer.name,
    });
  } catch (error) {
    next(error);
  }
};

export const handleFarmerAuthRegistrationHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, phoneNumber } = req.body;
    if (!username || !phoneNumber) {
      res.status(StatusCodes.BAD_REQUEST).json({
        Status: "Data Validation Error",
        message: "Invalid request Payload",
      });
      return;
    }
    const OTP = GenerateOTP();
    const existingFarmer = await prisma.farmer.findUnique({
      where: {
        phoneNumber,
      },
    });
    if (existingFarmer) {
      await prisma.farmer.update({
        where: { id: existingFarmer.id },
        data: {
          Otp: OTP.otp,
          OtpExpireTime: OTP.otpExpiresAt,
        },
      });
    } else {
      await prisma.farmer.create({
        data: {
          phoneNumber,
          name: username,
          password: "",
          Otp: OTP.otp,
          OtpExpireTime: OTP.otpExpiresAt,
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

export const LoginFarmer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
      res.status(StatusCodes.BAD_REQUEST).json({
        Status: "Validation Error",
        message: "all fields are required",
      });
      return;
    }
    const farmer = await prisma.farmer.findUnique({
      where: {
        phoneNumber,
      },
    });
    if (!farmer) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        Status: "Error",
        message: "Invalid phone number",
      });
      return;
    }
    const OTP = GenerateOTP();
    await prisma.farmer.update({
      where: { id: farmer.id },
      data: { Otp: OTP.otp, OtpExpireTime: OTP.otpExpiresAt },
    });
    await sendOTP(phoneNumber, OTP.otp);
    res.status(StatusCodes.OK).json({
      Status: "Success",
      message: "OTP sent successfully",
    });
  } catch (error) {
    next(error);
  }
};
