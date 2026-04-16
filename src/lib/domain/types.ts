export type IngestionMethod = "webhook" | "custom_api" | "manual" | "bulk_csv";

export type OrderStatus = "new" | "pending" | "in_transit" | "completed" | "returned" | "rejected";

export type CourierPushStatus =
  | "ready_to_push"
  | "pushed"
  | "awb_generated"
  | "failed_push"
  | "failed_awb"
  | "self_pickup";

export type PaymentMethod = "cod" | "bank_transfer" | "foc" | "cash";

export interface InboundOrderItem {
  sku: string;
  quantity: number;
  unitPrice?: number;
}

export interface InboundOrderPayload {
  name: string;
  phone: string;
  address: string;
  postcode: string;
  city?: string;
  state: string;
  country: string;
  items: InboundOrderItem[];
  selling_price: number;
  payment_method: string;
  source_order_id: string;
}

export interface NormalizedOrderPayload extends InboundOrderPayload {
  phone: string;
  address: string;
  postcode: string;
  city: string;
  state: string;
  country: string;
  payment_method: PaymentMethod;
}

export interface DuplicateSignal {
  reason: string;
  score: number;
}

export interface CourierService {
  validateShipment(orderId: string): Promise<{ valid: boolean; errors: string[] }>;
  pushOrder(orderId: string): Promise<{ success: boolean; status: CourierPushStatus; shipmentId?: string; error?: string }>;
  generateAwb(shipmentId: string): Promise<{ success: boolean; awbNumber?: string; labelUrl?: string; error?: string }>;
  normalizeResponse(raw: unknown): Record<string, unknown>;
  parseTrackingData(raw: unknown): { trackingNumber?: string; status?: string };
  cancelShipment?(shipmentId: string): Promise<{ success: boolean; error?: string }>;
}
