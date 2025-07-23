import "dotenv/config";
import express from "express";
import axios from "axios";
import { prisma } from "./prisma/client";
import { checkDatabaseConnection } from "./config/db.config";
import { errorHandler } from "./middleware/errorhandler";
import farmerRoutes from "./routes/farmer.route";
import AgriexpertRoutes from "./routes/Agriexpert.route";
import LikeRoutes from "./routes/likeRoutes";
import PostRoutes from "./routes/PostRoutes";
import AuthRoutes from "./routes/auth.routes";
import CropCalanderRequestRoutes from "./routes/CropcalanderRequest";
import {
  authMiddleware,
  AuthenticatedRequest,
} from "./middleware/authenticationMiddleware";
import { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import v2Routes from "../src/v2/v2-routes/index"
import fromData from "express-form-data";
import cors from "cors";

const app = express();

async function startServer() {
  app.use(express.json());
  app.use(cors());
  app.use(bodyParser.json());
  app.use(errorHandler);

  // ** HTTP routes for access
  app.use("/api/auth", AuthRoutes);
  app.use("/api", farmerRoutes);
  app.use("/api", AgriexpertRoutes);
  app.use("/api", LikeRoutes);
  app.use("/api/posts", PostRoutes);
  app.use("/api/ccr", CropCalanderRequestRoutes);
  app.use("/api/v2",v2Routes)

  app.get("/test", (req, res) => {
    res.send("Hello World");
  });

  app.get("/ping", authMiddleware, async (req: Request, res: Response) => {
    const userId = (req as AuthenticatedRequest).userId;
    const response = await prisma.farmer.findUnique({
      where: {
        id: userId,
      },
    });

    res.json(response);
  });

  app.post("/test-sms", async (req, res) => {
    const templateid = "1007161519960183117";
    const mobno = "+917978029866";
    const otp = 12202;
    let message =
      "Dear User,Your OTP for login is:" + otp + " With Regards,GTIDS IT Team";
    const smsurl = `https://smslogin.co/v3/api.php?username=gramtarang&apikey=2279de0891389c8d3a33&senderid=GTIDSP&templateid=${templateid}&mobile=${mobno}&message=${encodeURIComponent(
      message
    )}`;
    try {
      const response = await axios.post(smsurl);
      res.json({
        status: "sms request sent",
        smsResponse: response.data,
      });
      console.log(response);
    } catch (error) {
      console.log("something went wrong in sending sms", error);
    }
  });

  await checkDatabaseConnection(prisma);
  app.listen(3001, () => {
    console.log("Server is running on http://localhost:3000");
  });
}

startServer();
