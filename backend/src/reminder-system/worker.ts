import { Worker } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis({
  host: "localhost",
  port: 6379,
  maxRetriesPerRequest: null,
});

const worker = new Worker(
  "reminder-queue",
  async (job) => {
    const { phoneNumber, name, activityName, description } = job.data;
    const msg = `Hello ${name}, reminder: Today you have activity "${activityName}". ${
      description || ""
    }`;
    console.log(msg);
    setTimeout(() => {}, 3000);
  },
  { connection }
);
