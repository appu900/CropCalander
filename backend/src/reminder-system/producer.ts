import { reminderQueue } from "./queue";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function enqueueTodaysReminder() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const activities = await prisma.activity.findMany({
    where: {
      startDate: { gte: start, lte: end },
    },
    include: {
      cropCalendar: {
        include: {
          farmerRequest: {
            include: {
              farmer: true,
            },
          },
        },
      },
    },
  });

  for (const activity of activities) {
    const farmer = activity.cropCalendar.farmerRequest.farmer;
    await reminderQueue.add("send-reminder", {
      phoneNumber: farmer.phoneNumber,
      name: farmer.name,
      activityName: activity.activityName,
      description: activity.description,
    });
  }

  console.log("All reminder jobs enqued");
}
