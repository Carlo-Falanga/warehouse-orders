import { z } from "zod";

// Schema di validazione per la creazione e l'aggiornamento degli ordini
export const createOrderSchema = z
  .object({
    code: z.string().trim().min(1, "code is required"),
    productName: z.string().trim().min(1, "productName is required"),
    quantity: z.number().int().positive("quantity must be a positive integer"),
    priority: z.enum(["Alta", "Media", "Bassa"]),
  })
  .strict();

export const updateOrderSchema = createOrderSchema;
