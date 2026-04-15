import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") as "pending" | "approved" | "paid" | null;
  const data = await prisma.commission.findMany({ where: { status: status ?? undefined }, include: { order: true, seller: true } });
  return NextResponse.json({ data });
}
