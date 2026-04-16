import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { normalizeSourcePayload } from "@/lib/domain/normalization";

export async function GET() {
  const orders = await prisma.order.findMany({
    take: 100,
    orderBy: { createdAt: "desc" },
    include: { customer: true, items: true, shipments: true },
  });

  return NextResponse.json({ success: true, data: orders });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const normalized = normalizeSourcePayload(body);
    const source = req.headers.get("x-source-channel") ?? "custom_api";
    const orderNo = `${source}_${normalized.source_order_id}`;

    const existing = await prisma.order.findUnique({ where: { orderNo } });
    if (existing) {
      return NextResponse.json({ success: true, status: "duplicate", order_id: existing.id, source_order_id: normalized.source_order_id });
    }

    const customer = await prisma.customer.upsert({
      where: { phone: normalized.phone },
      update: { name: normalized.name, email: null },
      create: { name: normalized.name, phone: normalized.phone },
    });

    const address = await prisma.address.create({
      data: {
        customerId: customer.id,
        line1: normalized.address,
        postcode: normalized.postcode,
        city: normalized.city,
        state: normalized.state,
        country: normalized.country,
      },
    });

    const firstPrice = Number((normalized.selling_price / normalized.items.length).toFixed(2));

    const created = await prisma.order.create({
      data: {
        orderNo,
        source,
        customerId: customer.id,
        addressId: address.id,
        paymentMethod: normalized.payment_method === "cash" ? "cod" : normalized.payment_method,
        shippingMethod: "self_pickup",
        status: "new",
        subtotal: normalized.selling_price,
        shippingFee: 0,
        total: normalized.selling_price,
        items: {
          create: normalized.items.map((item) => ({
            productId: "seed-product",
            productName: item.sku,
            sku: item.sku,
            qty: item.quantity,
            unitPrice: firstPrice,
            totalPrice: item.quantity * firstPrice,
          })),
        },
      },
    });

    await prisma.webhookLog.create({
      data: { provider: source, payload: body, processed: true, headers: Object.fromEntries(req.headers.entries()) },
    });

    return NextResponse.json({ success: true, status: "created", order_id: created.id, source_order_id: normalized.source_order_id });
  } catch (error) {
    return NextResponse.json({ success: false, status: "validation_error", errors: { message: error instanceof Error ? error.message : "Unknown error" } }, { status: 400 });
  }
}
