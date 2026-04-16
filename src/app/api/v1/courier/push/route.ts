import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { order_id } = (await req.json()) as { order_id: string };
  const shipment = await prisma.shipment.create({
    data: {
      orderId: order_id,
      courierCode: "jnt",
      shipmentStatus: "picked_up",
      trackingNo: `TRK${Date.now()}`,
      rawResponse: { pushed: true, provider: "jnt" },
    },
  });

  return NextResponse.json({
    success: true,
    status: "pushed",
    shipment_id: shipment.id,
    courier_order_id: shipment.id,
    tracking_number: shipment.trackingNo,
  });
}
