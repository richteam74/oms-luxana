import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();

  if (!q) {
    return NextResponse.json({ error: "Missing search query" }, { status: 400 });
  }

  const customer = await prisma.customer.findFirst({
    where: {
      OR: [{ phone: { contains: q } }, { orders: { some: { orderNo: { contains: q, mode: "insensitive" } } } }],
    },
    include: {
      addresses: {
        orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
        take: 1,
      },
    },
  });

  if (!customer) {
    return NextResponse.json({ data: null });
  }

  return NextResponse.json({
    data: {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.addresses[0] ?? null,
    },
  });
}
