import { OrderStatus } from "@prisma/client";
import { prisma } from "@/lib/db";
import { adminCreateOrderSchema, publicOrderSchema } from "@/lib/validators/order";

function buildOrderNumber() {
  return `OMS-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(Math.random() * 9999)
    .toString()
    .padStart(4, "0")}`;
}

const normalizePhone = (phone: string) => phone.replace(/\s+/g, "").replace(/-/g, "");

type CreateOrderInput = {
  source: string;
  customer: { name: string; email?: string; phone: string };
  address: { line1: string; line2?: string; postcode: string; city: string; state: string; country: string };
  paymentMethod: "cod" | "bank_transfer" | "foc";
  shippingMethod: "jnt" | "spx" | "self_pickup";
  items: Array<{ productId: string; qty: number; unitPrice: number }>;
  notes?: string;
  privateNote?: string;
  awbNote?: string;
  sellingPrice?: number;
};

async function createOrder(payload: CreateOrderInput) {
  const normalizedPhone = normalizePhone(payload.customer.phone);

  const customer = await prisma.customer.upsert({
    where: { phone: normalizedPhone },
    update: {
      name: payload.customer.name.trim(),
      email: payload.customer.email?.trim() || null,
    },
    create: {
      name: payload.customer.name.trim(),
      email: payload.customer.email?.trim() || null,
      phone: normalizedPhone,
    },
  });

  const matchingAddress = await prisma.address.findFirst({
    where: {
      customerId: customer.id,
      line1: payload.address.line1.trim(),
      postcode: payload.address.postcode,
      city: payload.address.city.trim(),
      state: payload.address.state.trim(),
      country: payload.address.country.trim(),
    },
  });

  const address =
    matchingAddress ??
    (await prisma.address.create({
      data: {
        customerId: customer.id,
        line1: payload.address.line1.trim(),
        line2: payload.address.line2?.trim() || null,
        postcode: payload.address.postcode.trim(),
        city: payload.address.city.trim(),
        state: payload.address.state.trim(),
        country: payload.address.country.trim(),
      },
    }));

  const productIds = payload.items.map((item) => item.productId);
  const products = await prisma.product.findMany({ where: { id: { in: productIds } } });
  const productMap = new Map(products.map((product) => [product.id, product]));

  for (const item of payload.items) {
    const product = productMap.get(item.productId);
    if (!product) {
      throw new Error(`Product ${item.productId} not found.`);
    }
    if (product.stock < item.qty) {
      throw new Error(`Insufficient stock for ${product.name}.`);
    }
  }

  const subtotal = payload.items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0);
  const shippingFee = payload.shippingMethod === "self_pickup" ? 0 : 10;
  const total = payload.sellingPrice ?? subtotal + shippingFee;
  let orderNo = buildOrderNumber();
  let attempts = 0;

  while (attempts < 5) {
    const existing = await prisma.order.findUnique({ where: { orderNo } });
    if (!existing) break;
    attempts += 1;
    orderNo = buildOrderNumber();
  }

  if (attempts >= 5) {
    throw new Error("Unable to generate a unique order number. Please retry.");
  }

  const order = await prisma.$transaction(async (tx) => {
    for (const item of payload.items) {
      const product = productMap.get(item.productId)!;
      const updated = await tx.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.qty } },
      });
      await tx.stockLog.create({
        data: {
          productId: item.productId,
          qtyChange: -item.qty,
          note: "Order deduction",
          balance: updated.stock,
          reference: orderNo,
        },
      });
      if (product.stock - item.qty < product.minStock) {
        await tx.stockLog.create({
          data: {
            productId: item.productId,
            qtyChange: 0,
            note: "Low stock alert threshold reached",
            balance: updated.stock,
            reference: orderNo,
          },
        });
      }
    }

    return tx.order.create({
      data: {
        orderNo,
        source: payload.source,
        customerId: customer.id,
        addressId: address.id,
        paymentMethod: payload.paymentMethod,
        shippingMethod: payload.shippingMethod,
        status: OrderStatus.new,
        subtotal,
        shippingFee,
        total,
        notes: payload.notes?.trim() || null,
        privateNote: payload.privateNote?.trim() || null,
        awbNote: payload.awbNote?.trim() || null,
        items: {
          create: payload.items.map((item) => {
            const product = productMap.get(item.productId)!;
            return {
              productId: item.productId,
              productName: product.name,
              sku: product.sku,
              qty: item.qty,
              unitPrice: item.unitPrice,
              totalPrice: item.qty * item.unitPrice,
            };
          }),
        },
      },
    });
  });

  return order;
}

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

  const order = await createOrder(data);
  return { duplicate: false as const, orderNo: order.orderNo };
}

export async function createAdminOrder(payload: unknown) {
  const data = adminCreateOrderSchema.parse(payload);
  const order = await createOrder(data);
  return { orderNo: order.orderNo, id: order.id };
}
