import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCourierProvider } from "@/lib/courier/factory";

export async function POST(request: Request) {
  const { orderId, courierCode } = await request.json();
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });

  const provider = getCourierProvider(courierCode ?? process.env.OMS_DEFAULT_COURIER ?? "MOCK");
  const result = await provider.createShipment(order);

  const shipment = await prisma.shipment.create({
    data: {
      orderId: order.id,
      courierCode: (courierCode ?? "MOCK").toUpperCase(),
      trackingNo: result.trackingNo,
      awbNo: result.awbNo,
      labelUrl: result.labelUrl,
      shipmentStatus: "created",
      rawResponse: result.raw as never,
    },
  });

  await prisma.order.update({ where: { id: order.id }, data: { status: "in_transit" } });

  return NextResponse.json({ success: true, data: shipment });
}
