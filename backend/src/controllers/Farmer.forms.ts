import { Router, Request, Response } from "express";
import { prisma } from "../prisma/client";
import {
  AuthenticatedRequest,
  authMiddleware,
} from "../middleware/authenticationMiddleware";

const router = Router();

// GET /farmer/:farmerId/drone-spraying
router.get(
  "/drone-spraying",
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response) => {
    const farmerId = req.userId;
    if (!farmerId) {
      res.status(400).json({
        success: false,
        message: "bad request",
      });
      return;
    }
    const data = await prisma.droneSprayingFrom.findMany({
      where: {
        farmerId: farmerId,
      },
    });
    res.json(data);
    return
  }
);

// GET /farmer/:farmerId/expert-visits
router.get("/expert-visits",authMiddleware, async (req:AuthenticatedRequest, res: Response) => {
    const farmerId = req.userId;
    console.log(farmerId)
    if (!farmerId) {
      res.status(400).json({
        success: false,
        message: "bad request",
      });
      return;
    }
     const data = await prisma.expertVisit.findMany({
      where: {
        farmerID:farmerId
      },
    });
    res.json(data);
    return
});

// GET /farmer/:farmerId/soil-health
router.get("/soil-health", authMiddleware, async (req:AuthenticatedRequest, res: Response) => {
   const farmerId = req.userId;
    if (!farmerId) {
      res.status(400).json({
        success: false,
        message: "bad request",
      });
      return;
    }
     const data = await prisma.soilHealthMapForm.findMany({
      where: {
        farmerId:farmerId
      },
    });
    res.json(data);
    return
});

// GET /farmer/:farmerId/smart-irrigation
router.get(
  "/smart-irrigation",
  async (req:AuthenticatedRequest, res: Response) => {
    const farmerId = req.userId;
    if (!farmerId) {
      res.status(400).json({
        success: false,
        message: "bad request",
      });
      return;
    }
     const data = await prisma.soilHealthMapForm.findMany({
      where: {
        farmerId:farmerId
      },
    });
    res.json(data);
    return
  }
);


router.post('/expert-visits', authMiddleware, async (req:AuthenticatedRequest, res: Response) => {
  try {
    const farmerId = req.userId;
      if (!farmerId) {
      res.status(400).json({
        success: false,
        message: "bad request",
      });
      return;
    }
    const { farmLocation, cropType, AreainHector, Query } = req.body;

    const visit = await prisma.expertVisit.create({
      data: {
        farmerID:+farmerId,
        farmLocation,
        cropType,
        AreainHector,
        Query,
      },
    });

    res.status(201).json(visit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create expert visit request' });
    return
  }
});

router.post('/soil-health', authMiddleware, async (req:AuthenticatedRequest, res: Response) => {
  try {
    const farmerId = req.userId;
      if (!farmerId) {
      res.status(400).json({
        success: false,
        message: "bad request",
      });
      return;
    }
    const { farmLoaction, soilType, cropType, areaInHectares, query} = req.body;

    const soilForm = await prisma.soilHealthMapForm.create({
      data: {
        farmerId:+farmerId,
        farmLoaction,
        soilType, // Must be one of: "LOAM" | "CLAY" | "SANDY" | "SILT" | "PEAT" | "CHALK"
        cropType,
        areaInHectares,
        query,
      },
    });

    res.status(201).json(soilForm);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create soil health map form' });
  }
});

export default router;
