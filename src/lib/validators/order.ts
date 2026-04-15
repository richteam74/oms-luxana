import { z } from "zod";

export const publicOrderSchema = z.object({
  source: z.string().default("website"),
  customer: z.object({ name: z.string().min(2), email: z.string().email().optional(), phone: z.string().min(9) }),
  address: z.object({ line1: z.string().min(5), line2: z.string().optional(), postcode: z.string().min(5), city: z.string(), state: z.string(), country: z.string().default("Malaysia") }),
  paymentMethod: z.enum(["cod", "bank_transfer", "foc"]),
  shippingMethod: z.enum(["jnt", "spx", "self_pickup"]),
  items: z.array(z.object({ productId: z.string(), qty: z.number().int().positive(), unitPrice: z.number().positive() })).min(1),
  notes: z.string().optional(),
});
