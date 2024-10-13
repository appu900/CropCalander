import { z } from "zod";

export const agriExpertValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phoneNumber: z.string().min(10).max(10),
  password: z.string().min(4, "Password must be atleat 4 chacter long"),
  email:z.string().email("invalid email format").optional()
});
