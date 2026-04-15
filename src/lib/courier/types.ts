import { Order, Shipment } from "@prisma/client";

export interface CourierShipmentResult {
  trackingNo: string;
  awbNo: string;
  labelUrl?: string;
  raw: unknown;
}

export interface CourierProvider {
  createShipment(order: Order): Promise<CourierShipmentResult>;
  cancelShipment(shipment: Shipment): Promise<{ success: boolean; raw?: unknown }>;
  getTracking(trackingNo: string): Promise<{ status: string; raw?: unknown }>;
  printLabel(shipment: Shipment): Promise<{ labelUrl: string }>;
  validatePostcode(postcode: string): Promise<{ valid: boolean; area?: string }>;
}
