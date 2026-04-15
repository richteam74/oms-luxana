import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { prisma } from "@/lib/db";
import { createAdminOrder } from "@/lib/services/order-service";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const status = url.searchParams.get("status");
  const q = url.searchParams.get("q");
  const orders = await prisma.order.findMany({
    where: {
      status: status ? (status as never) : undefined,
      OR: q
        ? [
            { orderNo: { contains: q, mode: "insensitive" } },
            { customer: { name: { contains: q, mode: "insensitive" } } },
            { customer: { phone: { contains: q } } },
          ]
        : undefined,
    },
    include: { customer: true, seller: true },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  return NextResponse.json({ data: orders });
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const order = await createAdminOrder(payload);
    return NextResponse.json({ data: order }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      const fieldErrors = error.issues.reduce<Record<string, string[]>>((acc, issue) => {
        const path = issue.path.length > 0 ? issue.path.join(".") : "form";
        if (!acc[path]) acc[path] = [];
        acc[path].push(issue.message);
        return acc;
      }, {});
      const firstFieldError = Object.values(fieldErrors).flat().find(Boolean);
      return NextResponse.json(
        {
          error: firstFieldError ?? "Validation failed. Please review the highlighted fields.",
          details: fieldErrors,
        },
        { status: 400 },
      );
    }
    const message = error instanceof Error ? error.message : "Unable to create order";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
