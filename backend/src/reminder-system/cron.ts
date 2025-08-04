import cron from "node-cron";
import { enqueueTodaysReminder } from "./producer";

// 0 7 * * *
cron.schedule("*/2 * * * *", async () => {
  console.log("Running scheduler reminder");
  await enqueueTodaysReminder();
});

console.log("Running scheduler....")
console.log("i know how to code....")
      