import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const products = await prisma.product.findMany({ take: 100, orderBy: { createdAt: "desc" } });
  return NextResponse.json({ success: true, data: products });
}
