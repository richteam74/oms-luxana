import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const [totalSales, completedRevenue, pendingRevenue, returnedLosses] = await Promise.all([
    prisma.order.aggregate({ _sum: { total: true } }),
    prisma.order.aggregate({ _sum: { total: true }, where: { status: "completed" } }),
    prisma.order.aggregate({ _sum: { total: true }, where: { status: { in: ["new", "pending", "in_transit"] } } }),
    prisma.order.aggregate({ _sum: { total: true }, where: { status: "returned" } }),
  ]);

  return NextResponse.json({
    totalSales: totalSales._sum.total ?? 0,
    completedRevenue: completedRevenue._sum.total ?? 0,
    pendingRevenue: pendingRevenue._sum.total ?? 0,
    returnedLosses: returnedLosses._sum.total ?? 0,
  });
}
