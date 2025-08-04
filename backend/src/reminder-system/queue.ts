import { Queue } from "bullmq";
import IOredis from "ioredis";

const connection = new IOredis({
  host: "localhost",
  port: 6379,
  maxRetriesPerRequest: null,
})

export const reminderQueue = new Queue("reminder-queue", { connection });
