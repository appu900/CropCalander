import { PrismaClient } from "@prisma/client";
import { dbConfig } from "src/config/db.config";

export const prisma = new PrismaClient();
