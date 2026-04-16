import { z } from "zod";
import type { DuplicateSignal, InboundOrderPayload, NormalizedOrderPayload, PaymentMethod } from "./types";

const payloadSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  address: z.string().min(6),
  postcode: z.string().min(4),
  city: z.string().optional(),
  state: z.string().min(2),
  country: z.string().min(2),
  items: z.array(z.object({ sku: z.string().min(1), quantity: z.number().int().positive() })).min(1),
  selling_price: z.number().positive(),
  payment_method: z.string().min(1),
  source_order_id: z.string().min(3),
});

const stateDefaultCityMap: Record<string, string> = {
  SELANGOR: "SHAH ALAM",
  KUALA_LUMPUR: "KUALA LUMPUR",
  JOHOR: "JOHOR BAHRU",
  PENANG: "GEORGETOWN",
};

export const sanitizePhone = (value: string) => value.replace(/[^\d]/g, "");
export const isValidPhone = (value: string) => /^60\d{8,11}$/.test(value);
export const sanitizeAddress = (value: string) => value.replace(/\s+/g, " ").trim();
export const sanitizePostcode = (value: string) => value.replace(/[^\d]/g, "").slice(0, 5);
export const extractCityFromAddress = (value: string) => value.split(",").at(-1)?.trim().toUpperCase() ?? "";
export const resolveCityByPostcode = (postcode: string) => (postcode.startsWith("68") ? "AMPANG" : undefined);
export const fallbackCityByState = (state: string) => stateDefaultCityMap[state.replace(/\s+/g, "_").toUpperCase()] ?? "KUALA LUMPUR";
export const normalizeSkuForApi = (sku: string) => sku.trim().toUpperCase().replace(/\s+/g, "-");

export function mapPaymentMethod(input: string): PaymentMethod {
  const value = input.toLowerCase();
  if (value === "cod") return "cod";
  if (["bank_transfer", "bank", "transfer"].includes(value)) return "bank_transfer";
  if (["foc", "free", "free_of_charge"].includes(value)) return "foc";
  return "cash";
}

export function combineUpsaleItems(items: InboundOrderPayload["items"]) {
  const merged = new Map<string, number>();
  for (const item of items) {
    const key = normalizeSkuForApi(item.sku);
    merged.set(key, (merged.get(key) ?? 0) + item.quantity);
  }
  return [...merged.entries()].map(([sku, quantity]) => ({ sku, quantity }));
}

export function normalizeSourcePayload(payload: unknown): NormalizedOrderPayload {
  const parsed = payloadSchema.parse(payload);
  const phone = sanitizePhone(parsed.phone);
  const state = parsed.state.trim().toUpperCase();
  const postcode = sanitizePostcode(parsed.postcode);
  const city = (parsed.city?.trim().toUpperCase() || resolveCityByPostcode(postcode) || fallbackCityByState(state));

  if (!isValidPhone(phone)) throw new Error("Invalid Malaysian phone format");

  return {
    ...parsed,
    phone,
    address: sanitizeAddress(parsed.address),
    postcode,
    city,
    state,
    country: parsed.country.trim().toUpperCase(),
    payment_method: mapPaymentMethod(parsed.payment_method),
    items: combineUpsaleItems(parsed.items),
  };
}

export function detectDuplicateSourceOrder(existing: { sourceOrderId: string; sourceChannelId: string }[], sourceOrderId: string, sourceChannelId: string) {
  return existing.find((row) => row.sourceOrderId === sourceOrderId && row.sourceChannelId === sourceChannelId);
}

export function detectOperationalDuplicate(input: {
  normalizedPhone: string;
  normalizedAddress: string;
  name: string;
  postcode: string;
  skuPattern: string;
  createdWithinMinutes: number;
}) {
  const signals: DuplicateSignal[] = [];
  if (input.normalizedPhone) signals.push({ reason: "same_phone_number", score: 0.35 });
  if (input.normalizedAddress) signals.push({ reason: "same_normalized_address", score: 0.25 });
  if (input.name && input.postcode) signals.push({ reason: "same_customer_name_plus_postcode", score: 0.15 });
  if (input.skuPattern) signals.push({ reason: "same_phone_and_sku_pattern", score: 0.15 });
  if (input.createdWithinMinutes <= 30) signals.push({ reason: "repeated_order_short_window", score: 0.2 });
  const total = Math.min(0.99, signals.reduce((sum, s) => sum + s.score, 0));
  return { signals, score: total, flagged: total >= 0.5 };
}
