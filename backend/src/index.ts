
import 'dotenv/config';
import express from "express";
import { prisma } from "./prisma/client";
import { checkDatabaseConnection } from "./config/db.config";
import { errorHandler } from "./middleware/errorhandler";
import farmerRoutes from "./routes/farmer.route"
import AgriexpertRoutes from "./routes/Agriexpert.route"
import LikeRoutes from "./routes/likeRoutes"
import PostRoutes from "./routes/PostRoutes"
import CropCalanderRequestRoutes from "./routes/CropcalanderRequest"
import { authMiddleware,AuthenticatedRequest } from "./middleware/authenticationMiddleware";
import { Request,Response,NextFunction } from "express";
import bodyParser from "body-parser";
import fromData from "express-form-data"
import cors from "cors"


const app = express();

async function startServer() {

  app.use(express.json());
  app.use(cors())
  app.use(bodyParser.json())
  app.use(errorHandler)

  // ** HTTP routes for access
  app.use("/api",farmerRoutes)
  app.use("/api",AgriexpertRoutes)
  app.use("/api",LikeRoutes)
  app.use("/api/posts",PostRoutes)
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
