import { PrismaClient } from "@prisma/client";
import { PrismaClientOptions } from "@prisma/client/runtime/library";

export const dbConfig: PrismaClientOptions = {
  log: ["query", "info", "warn", "error"],
  errorFormat: "pretty",
};

export const checkDatabaseConnection = async (prisma: PrismaClient) => {
  try {
    await prisma.$connect();
    console.log("Database connection established");
  } catch (error) {
    console.error("Error establishing database connection", error);
  }
};
