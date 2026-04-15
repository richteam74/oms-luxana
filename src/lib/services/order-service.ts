import { OrderStatus } from "@prisma/client";
import { prisma } from "@/lib/db";
import { publicOrderSchema } from "@/lib/validators/order";

export async function createPublicOrder(payload: unknown) {
  const data = publicOrderSchema.parse(payload);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const duplicate = await prisma.order.findFirst({
    where: {
      createdAt: { gte: today },
      customer: { phone: data.customer.phone },
      address: { line1: data.address.line1 },
    },
  });

  if (duplicate) return { duplicate: true as const, orderNo: duplicate.orderNo };

  const customer = await prisma.customer.upsert({
    where: { phone: data.customer.phone },
    update: { name: data.customer.name, email: data.customer.email },
    create: { name: data.customer.name, email: data.customer.email, phone: data.customer.phone },
  });

  const address = await prisma.address.create({ data: { customerId: customer.id, ...data.address } });

  const subtotal = data.items.reduce((sum, i) => sum + i.qty * i.unitPrice, 0);
  const shippingFee = data.shippingMethod === "self_pickup" ? 0 : 10;
  const total = subtotal + shippingFee;
  const orderNo = `OMS-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(Math.random() * 9999).toString().padStart(4, "0")}`;

  const order = await prisma.$transaction(async (tx) => {
    for (const item of data.items) {
      await tx.product.update({ where: { id: item.productId }, data: { stock: { decrement: item.qty } } });
      await tx.stockLog.create({
        data: {
          productId: item.productId,
          qtyChange: -item.qty,
          note: "Order deduction",
          balance: 0,
          reference: orderNo,
        },
      });
    }

    return tx.order.create({
      data: {
        orderNo,
        source: data.source,
        customerId: customer.id,
        addressId: address.id,
        paymentMethod: data.paymentMethod,
        shippingMethod: data.shippingMethod,
        status: OrderStatus.new,
        subtotal,
        shippingFee,
        total,
        notes: data.notes,
        items: {
          create: data.items.map((item) => ({
            productId: item.productId,
            productName: "Website Item",
            sku: "N/A",
            qty: item.qty,
            unitPrice: item.unitPrice,
            totalPrice: item.qty * item.unitPrice,
          })),
        },
      },
    });
  });

  return { duplicate: false as const, orderNo: order.orderNo };
}
