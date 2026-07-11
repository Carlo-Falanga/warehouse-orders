import { z } from "zod";

export const createOrderSchema = z
  .object({
    code: z.string().trim().min(1, "code is required"),
    productName: z.string().trim().min(1, "productName is required"),
    quantity: z.number().int().positive("Quantity must be a positive integer"),
    priority: z.enum(["Alta", "Media", "bassa"]),
  })
  .strict();

export const updateOrderSchema = createOrderSchema;
