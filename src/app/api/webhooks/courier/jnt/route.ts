import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const map: Record<string, "pending" | "in_transit" | "completed" | "returned" | "rejected"> = {
  created: "pending",
  picked_up: "in_transit",
  in_transit: "in_transit",
  out_for_delivery: "in_transit",
  delivered: "completed",
  failed_delivery: "pending",
  returned: "returned",
  cancelled: "rejected",
};

export async function POST(request: Request) {
  const payload = await request.json();
  const signature = request.headers.get("x-signature");

  const log = await prisma.webhookLog.create({ data: { provider: "jnt", payload, signature } });
  const trackingNo = payload.trackingNo as string;
  const event = payload.event as string;

  const shipment = await prisma.shipment.findUnique({ where: { trackingNo } });
  if (!shipment) return NextResponse.json({ success: false, message: "Shipment not found" }, { status: 404 });

  await prisma.$transaction([
    prisma.shipment.update({ where: { id: shipment.id }, data: { shipmentStatus: event as never } }),
    prisma.shipmentTrackingLog.create({ data: { shipmentId: shipment.id, event, rawPayload: payload } }),
    prisma.order.update({ where: { id: shipment.orderId }, data: { status: map[event] ?? "pending" } }),
    prisma.webhookLog.update({ where: { id: log.id }, data: { processed: true } }),
  ]);

  return NextResponse.json({ success: true });
}
