import express from "express";
import { prisma } from "./prisma/client";
import { checkDatabaseConnection } from "./config/db.config";
import { errorHandler } from "./middleware/errorhandler";
import farmerRoutes from "./routes/farmer.route"
import AgriexpertRoutes from "./routes/Agriexpert.route"
const app = express();

async function startServer() {
  app.use(express.json());
  app.use(errorHandler)
  app.use("/api",farmerRoutes)
  app.use("/api",AgriexpertRoutes)
  await checkDatabaseConnection(prisma);
  app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
  });
}

startServer();
