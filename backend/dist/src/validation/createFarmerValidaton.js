"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFarmerSchema = void 0;
const zod_1 = require("zod");
exports.createFarmerSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    password: zod_1.z.string().min(4, "password is required"),
    email: zod_1.z.string().email("Invalid email format").optional(),
    phoneNumber: zod_1.z.string().min(1, "Phone number is required"),
});
