

import {z} from "zod";

export const createFarmerSchema = z.object({
    name: z.string().min(1, "Name is required"), 
    password: z.string().min(4, "password is required"), 
    email: z.string().email("Invalid email format").optional(), 
    phoneNumber: z.string().min(1, "Phone number is required"), 
})