"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.agriExpertValidationSchema = void 0;
const zod_1 = require("zod");
exports.agriExpertValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    phoneNumber: zod_1.z.string().min(10).max(10),
    password: zod_1.z.string().min(4, "Password must be atleat 4 chacter long"),
    email: zod_1.z.string().email("invalid email format").optional()
});
