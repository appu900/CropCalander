import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import multer from "multer";
import { uploadPdfToS3 } from "../utils/s3/upload";
import dotenv from "dotenv"
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
    if(!req.file){
        res.status(400).json({
            success:false,
            error:"No PDF file provided"
        })
        return;
    }
    
    console.log('📁 File received:', req.file.originalname);
    console.log('📊 File size:', (req.file.size / 1024).toFixed(2),'kb')
    const url = await uploadPdfToS3(
        req.file.buffer,
        req.file.originalname,
        process.env.AWS_BUCKET_NAME
    )
    res.json(url)
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
  } catch (error) {
    next(error);
  }
};
