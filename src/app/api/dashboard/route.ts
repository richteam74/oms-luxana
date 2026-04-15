import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const [todayOrders, totalSales, latestOrders] = await Promise.all([
    prisma.order.count({ where: { createdAt: { gte: new Date(new Date().setHours(0,0,0,0)) } } }),
    prisma.order.aggregate({ _sum: { total: true }, where: { status: "completed" } }),
    prisma.order.findMany({ take: 5, orderBy: { createdAt: "desc" }, include: { customer: true } }),
  ]);

  return NextResponse.json({ todayOrders, totalSales: totalSales._sum.total ?? 0, latestOrders });
}
