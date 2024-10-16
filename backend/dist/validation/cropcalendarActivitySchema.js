"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cropCalendarActivitySchema = void 0;
const zod_1 = require("zod");
exports.cropCalendarActivitySchema = zod_1.z.object({
    activityName: zod_1.z.string().min(1, "Activity name is required"), // Ensures it's a non-empty string
    activityType: zod_1.z.string().min(1, "Activity type is required"), // Ensures it's a non-empty string
    startDate: zod_1.z.coerce.date(), // Coerces to Date if valid date string is passed
    endDate: zod_1.z.coerce.date(), // Coerces to Date if valid date string is passed
    description: zod_1.z.string().min(1, "Description is required") // Ensures it's a non-empty string
});
