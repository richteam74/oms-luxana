import { z } from "zod";

const paymentMethodValues = ["cod", "bank_transfer", "foc"] as const;
const shippingMethodValues = ["jnt", "spx", "self_pickup"] as const;

const paymentAliases: Record<string, (typeof paymentMethodValues)[number]> = {
  cod: "cod",
  "cash on delivery": "cod",
  cash_on_delivery: "cod",
  bank_transfer: "bank_transfer",
  "bank transfer": "bank_transfer",
  transfer: "bank_transfer",
  foc: "foc",
  "free of charge": "foc",
  free_of_charge: "foc",
};

const shippingAliases: Record<string, (typeof shippingMethodValues)[number]> = {
  jnt: "jnt",
  "j&t": "jnt",
  "j&t express": "jnt",
  spx: "spx",
  "spx express": "spx",
  "self pickup": "self_pickup",
  self_pickup: "self_pickup",
  pickup: "self_pickup",
};

const normalizeOption = <T extends string>(value: string, aliases: Record<string, T>) =>
  aliases[value.trim().toLowerCase().replace(/\s+/g, " ")] ?? value.trim().toLowerCase().replace(/\s+/g, "_");

const customerSchema = z.object({
  name: z.string().trim().min(2, "Customer name must be at least 2 characters."),
  email: z
    .string()
    .trim()
    .email("Customer email is invalid.")
    .optional()
    .or(z.literal("")),
  phone: z.string().trim().min(9, "Customer phone must be at least 9 characters."),
});

const addressSchema = z.object({
  line1: z.string().trim().min(5, "Address line 1 must be at least 5 characters."),
  line2: z.string().trim().optional().or(z.literal("")),
  postcode: z.string().trim().min(4, "Postcode must be at least 4 characters."),
  city: z.string().trim().min(2, "City must be at least 2 characters."),
  state: z.string().trim().min(2, "State must be at least 2 characters."),
  country: z.string().trim().min(2).default("Malaysia"),
});

const orderItemSchema = z.object({
  productId: z.string().min(1),
  qty: z.number().int().positive("Quantity must be at least 1."),
  unitPrice: z.number().nonnegative(),
});

export const publicOrderSchema = z.object({
  source: z.string().trim().default("website"),
  customer: customerSchema,
  address: addressSchema,
  paymentMethod: z.preprocess(
    (value) => (typeof value === "string" ? normalizeOption(value, paymentAliases) : value),
    z.enum(paymentMethodValues),
  ),
  shippingMethod: z.preprocess(
    (value) => (typeof value === "string" ? normalizeOption(value, shippingAliases) : value),
    z.enum(shippingMethodValues),
  ),
  items: z.array(orderItemSchema).min(1),
  notes: z.string().trim().optional().or(z.literal("")),
});

export const adminCreateOrderSchema = publicOrderSchema.extend({
  source: z.string().trim().default("admin"),
  privateNote: z.string().trim().optional().or(z.literal("")),
  awbNote: z.string().trim().optional().or(z.literal("")),
  sellingPrice: z.number().nonnegative().optional(),
});
