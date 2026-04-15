import { z } from "zod";

const customerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email().optional(),
  phone: z.string().min(9),
});

const addressSchema = z.object({
  line1: z.string().min(5),
  line2: z.string().optional(),
  postcode: z.string().min(4),
  city: z.string().min(2),
  state: z.string().min(2),
  country: z.string().default("Malaysia"),
});

const orderItemSchema = z.object({
  productId: z.string().min(1),
  qty: z.number().int().positive(),
  unitPrice: z.number().nonnegative(),
});

export const publicOrderSchema = z.object({
  source: z.string().default("website"),
  customer: customerSchema,
  address: addressSchema,
  paymentMethod: z.enum(["cod", "bank_transfer", "foc"]),
  shippingMethod: z.enum(["jnt", "spx", "self_pickup"]),
  items: z.array(orderItemSchema).min(1),
  notes: z.string().optional(),
});

export const adminCreateOrderSchema = publicOrderSchema.extend({
  source: z.string().default("admin"),
  privateNote: z.string().optional(),
  awbNote: z.string().optional(),
  sellingPrice: z.number().nonnegative().optional(),
});
