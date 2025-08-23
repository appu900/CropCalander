import express, { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../../../prisma/client";

export const fetchAllCropCalenderRequests = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cropCalanderResponse = await prisma.cropCalandarRequest.findMany({
      include: {
        farmer: true,
      },
    });
    if (!cropCalanderResponse || cropCalanderResponse.length === 0) {
      res.status(StatusCodes.NOT_FOUND).json({
        Status: "Error",
        message: "No Crop Calender Requests found",
      });
      return;
    }
    res.status(StatusCodes.OK).json({
      Status: "Success",
      message: "Crop Calender Requests fetched successfully",
      data: cropCalanderResponse,
    });
  } catch (error) {
    console.log("Something went wrong in fetchAllCropCalenderRequests", error);
    next(error);
  }
};
export const AcceptCropCalender = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cropCalenderRequestId } = req.body;
    if (!cropCalenderRequestId) {
      res.status(StatusCodes.BAD_REQUEST).json({
        Status: "Validation Error",
        message: "Crop Calender ID is required",
      });
      return;
    }

    const response = await prisma.cropCalandarRequest.update({
      where: {
        id: cropCalenderRequestId,
      },
      data: {
        status: "ACCEPTED",
      },
    });
    if (!response) {
      res.status(StatusCodes.NOT_FOUND).json({
        Status: "Error",
        message: "Crop Calender Request not found",
      });
      return;
    }
    res.status(StatusCodes.OK).json({
      Status: "Success",
      message: "Crop Calender Request accepted successfully",
      data: response,
    });
  } catch (error) {
    console.log("Something went wrong in AcceptCropCalender", error);
    next(error);
  }
};

export const fetchAllAcceptedCropCalenderRequests = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cropCalanderRequests = await prisma.cropCalandarRequest.findMany({
      where: {
        status: "ACCEPTED",
        cropCalandar: {
          isNot: null,
        },
      },
      include: {
        farmer: true,
        cropCalandar: true,
      },
    });
    if (!cropCalanderRequests || cropCalanderRequests.length === 0) {
      res.status(StatusCodes.NOT_FOUND).json({
        Status: "Error",
        message: "No Accepted Crop Calender Requests found",
      });
      return;
    }
    res.status(StatusCodes.OK).json({
      Status: "Success",
      message: "Accepted Crop Calender Requests fetched successfully",
      data: cropCalanderRequests,
    });
  } catch (error) {
    next(error);
  }
};

export const changeCropCalanderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cropCalanderRequestID } = req.body;
    if (!cropCalanderRequestID) {
      res.status(StatusCodes.BAD_REQUEST).json({
        Status: "Validation Error",
        message: "Crop Calender Request ID is required",
      });
      return;
    }
    const response = await prisma.cropCalandarRequest.update({
      where: {
        id: cropCalanderRequestID,
      },
      data: {
        status: "COMPLETED",
      },
    });
    if (!response) {
      res.status(StatusCodes.NOT_FOUND).json({
        Status: "Error",
        message: "Crop Calender Request not found",
      });
      return;
    }
    res.status(StatusCodes.OK).json({
      Status: "Success",
      message: "Crop Calender Request status changed to COMPLETED",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const fetchCropCalenderRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const requestedStatus = req.body.status;
    const statusTobeQueried = requestedStatus.toUpperCase();
    const cropCalendarRequests = await prisma.cropCalandarRequest.findMany({
      where: {
        status: statusTobeQueried,
      },
    });
    res.status(StatusCodes.OK).json({
      Status: "Success",
      data: cropCalendarRequests,
    });
  } catch (error) {
    next(error);
  }
};

export const fetchAllDroneSprayingRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await prisma.droneSprayingFrom.findMany({
      where: {
        status: "PENDING",
      },
    });
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const fetchAllSmartIrrigationRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await prisma.smartIrrigationForm.findMany({
      where: {
        status: "PENDING",
      },
    });
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const fetchAllExpertVisitRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await prisma.expertVisit.findMany({
      where: {
        status: "PENDING",
      },
    });
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const fetchAllSoilHealthMapRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await prisma.soilHealthMapForm.findMany({
      where: {
        status: "PENDING",
      },
    });
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};
