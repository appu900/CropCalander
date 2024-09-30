

import express from "express";
import { prisma } from "./prisma/client";
import { checkDatabaseConnection } from "./config/db.config";
import { errorHandler } from "./middleware/errorhandler";
import farmerRoutes from "./routes/farmer.route"
import AgriexpertRoutes from "./routes/Agriexpert.route"
import CropCalanderRequestRoutes from "./routes/CropcalanderRequest"
import { authMiddleware,AuthenticatedRequest } from "./middleware/authenticationMiddleware";
import { Request,Response,NextFunction } from "express";

const app = express();

async function startServer() {

  app.use(express.json());
  app.use(errorHandler)

  app.use("/api",farmerRoutes)
  app.use("/api",AgriexpertRoutes)
  app.use("/api/ccr",CropCalanderRequestRoutes)

  app.get("/ping",authMiddleware,async (req:Request,res:Response)=>{
    const userId = (req as AuthenticatedRequest).userId;
    const response = await prisma.farmer.findUnique({
      where:{
        id:userId
      }
    })

    res.json(response)

  })

  await checkDatabaseConnection(prisma);
  app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
  });
}

startServer();
