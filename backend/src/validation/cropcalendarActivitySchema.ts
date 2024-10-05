

import {z} from "zod";

export const cropCalendarActivitySchema = z.object({
    activityName: z.string().min(1, "Activity name is required"), // Ensures it's a non-empty string
    activityType: z.string().min(1, "Activity type is required"), // Ensures it's a non-empty string
    startDate: z.coerce.date(), // Coerces to Date if valid date string is passed
    endDate: z.coerce.date(),   // Coerces to Date if valid date string is passed
    description: z.string().min(1, "Description is required") // Ensures it's a non-empty string
  });