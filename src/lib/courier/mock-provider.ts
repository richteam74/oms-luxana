import { randomUUID } from "node:crypto";
import type { Order, Shipment } from "@prisma/client";
import type { CourierProvider } from "@/lib/courier/types";

export class MockCourierProvider implements CourierProvider {
  async createShipment(order: Order) {
    const token = randomUUID().slice(0, 8).toUpperCase();
    return {
      trackingNo: `MOCK${Date.now()}`,
      awbNo: `AWB-${token}`,
      labelUrl: `https://mock-courier.local/label/${order.orderNo}`,
      raw: { mode: "mock" },
    };
  }
  async cancelShipment(shipment: Shipment) { return { success: true, raw: { shipmentId: shipment.id } }; }
  async getTracking() { return { status: "in_transit", raw: { mocked: true } }; }
  async printLabel(shipment: Shipment) { return { labelUrl: shipment.labelUrl ?? "https://mock-courier.local/label/default" }; }
  async validatePostcode(postcode: string) { return { valid: /^\d{5}$/.test(postcode), area: "MY" }; }
}
