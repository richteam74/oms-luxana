import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { shipment_id } = (await req.json()) as { shipment_id: string };
  const awbNumber = `AWB${Date.now()}`;

  const shipment = await prisma.shipment.update({
    where: { id: shipment_id },
    data: {
      awbNo: awbNumber,
      labelUrl: `https://labels.richapps.internal/${awbNumber}.pdf`,
      shipmentStatus: "in_transit",
    },
  });

  return NextResponse.json({
    success: true,
    status: "awb_generated",
    shipment_id: shipment.id,
    awb_number: shipment.awbNo,
    label_url: shipment.labelUrl,
  });
}
