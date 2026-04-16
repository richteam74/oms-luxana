import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

const statusSchema = z.object({ status: z.enum(["new", "pending", "in_transit", "completed", "returned", "rejected"]) });

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = statusSchema.parse(await req.json());
  const updated = await prisma.order.update({ where: { id }, data: { status: body.status } });
  return NextResponse.json({ success: true, status: "updated", order_id: updated.id, order_status: updated.status });
}
