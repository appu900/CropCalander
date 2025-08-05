import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import multer from "multer";
import { uploadPdfToS3 } from "../utils/s3/upload";
import dotenv from "dotenv";
import { prisma } from "../prisma/client";
dotenv.config();

export const fileupload = multer({
  storage: multer.memoryStorage(),
  //   fileFilter: (req, file, cb) => {
  //     if (file.mimetype === "application/pdf") {
  //       cb(null, true);
  //     } else {
  //       cb(new Error("Invalid file type, only pdf is allowed"));
  //     }
  //   },
  limits: { fileSize: 10 * 1024 * 1024 },
});

export const testUpload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        error: "No PDF file provided",
      });
      return;
    }

    console.log("📁 File received:", req.file.originalname);
    console.log("📊 File size:", (req.file.size / 1024).toFixed(2), "kb");
    const url = await uploadPdfToS3(
      req.file.buffer,
      req.file.originalname,
      process.env.AWS_BUCKET_NAME
    );
    res.json(url);
    return;
  } catch (error) {
    next(error);
  }
};

export const uploadSmartIrrigatinSolution = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const requestFromId = req.params.id
    if (!requestFromId) {
      res.status(400).json({
        success: false,
        message: "formid is required",
      });
      return;
    }

    if (!req.file) {
      res.status(400).json({
        success: false,
        error: "No PDF file provided",
      });
      return;
    }
    const url = await uploadPdfToS3(
      req.file.buffer,
      req.file.originalname,
      process.env.AWS_BUCKET_NAME
    );

    const response = await prisma.smartIrrigationForm.update({
      where: {
        id: +requestFromId,
      },
      data: {
        status: "COMPLETED",
        pdf: url,
      },
    });
    res.status(200).json({
      success:true,
      message:"solution uploaded sucessfully"
    })
    return;
  } catch (error) {
    next(error);
  }
};

export const uploadExpertvisitSolution = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const requestFromId = req.params.id
    if (!requestFromId) {
      res.status(400).json({
        success: false,
        message: "formid is required",
      });
      return;
    }

    if (!req.file) {
      res.status(400).json({
        success: false,
        error: "No PDF file provided",
      });
      return;
    }
    const url = await uploadPdfToS3(
      req.file.buffer,
      req.file.originalname,
      process.env.AWS_BUCKET_NAME
    );

    const response = await prisma.expertVisit.update({
      where: {
        id: +requestFromId,
      },
      data: {
        status: "COMPLETED",
        pdf: url,
      },
    });
    res.status(200).json({
      success:true,
      message:"solution uploaded sucessfully"
    })
    return;
  } catch (error) {
    next(error);
  }
};


export const uploadSoilhealthMapSolution = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const requestFromId = req.params.id
    if (!requestFromId) {
      res.status(400).json({
        success: false,
        message: "formid is required",
      });
      return;
    }

    if (!req.file) {
      res.status(400).json({
        success: false,
        error: "No PDF file provided",
      });
      return;
    }
    const url = await uploadPdfToS3(
      req.file.buffer,
      req.file.originalname,
      process.env.AWS_BUCKET_NAME
    );

    const response = await prisma.soilHealthMapForm.update({
      where: {
        id: +requestFromId,
      },
      data: {
        status: "COMPLETED",
        pdf: url,
      },
    });
    res.status(200).json({
      success:true,
      message:"solution uploaded sucessfully"
    })
    return
  } catch (error) {
    next(error);
  }
};


export const uploadDroneSprayingSolution = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const requestFromId = req.params.id
    if (!requestFromId) {
      res.status(400).json({
        success: false,
        message: "formid is required",
      });
      return;
    }

    if (!req.file) {
      res.status(400).json({
        success: false,
        error: "No PDF file provided",
      });
      return;
    }
    const url = await uploadPdfToS3(
      req.file.buffer,
      req.file.originalname,
      process.env.AWS_BUCKET_NAME
    );

    const response = await prisma.droneSprayingFrom.update({
      where: {
        id: +requestFromId,
      },
      data: {
        status: "COMPLETED",
        pdf: url,
      },
    });
    res.status(200).json({
      success:true,
      message:"solution uploaded sucessfully"
    })
    return;
  } catch (error) {
    next(error);
  }
};