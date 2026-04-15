import { PrismaClient, Role, OrderStatus, PaymentMethod, ShippingMethod, ShipmentStatus, CommissionStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.commission.deleteMany();
  await prisma.shipmentTrackingLog.deleteMany();
  await prisma.shipment.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.orderNote.deleteMany();
  await prisma.order.deleteMany();
  await prisma.address.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.stockLog.deleteMany();
  await prisma.stockAdjustment.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.bundleItem.deleteMany();
  await prisma.bundle.deleteMany();
  await prisma.product.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.courierIntegration.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash("Admin@123", 10);

  const users = await Promise.all([
    prisma.user.create({ data: { name: "Super Admin", email: "superadmin@luxana.my", phone: "60123456789", passwordHash, role: Role.super_admin } }),
    prisma.user.create({ data: { name: "Admin Aina", email: "admin@luxana.my", phone: "60127888888", passwordHash, role: Role.admin } }),
    prisma.user.create({ data: { name: "Staff Hakim", email: "staff@luxana.my", phone: "60123334444", passwordHash, role: Role.staff } }),
    prisma.user.create({ data: { name: "Seller Farah", email: "seller1@luxana.my", phone: "60117776655", passwordHash, role: Role.seller, storeName: "Farah Beauty Hub" } }),
    prisma.user.create({ data: { name: "Seller Amir", email: "seller2@luxana.my", phone: "60116668899", passwordHash, role: Role.seller, storeName: "Amir Gadget Store" } }),
  ]);

  const [brand1, brand2] = await Promise.all([
    prisma.brand.create({ data: { name: "Luxana Care" } }),
    prisma.brand.create({ data: { name: "Nusa Tech" } }),
  ]);

  const products = await Promise.all([
    prisma.product.create({ data: { name: "Glow Serum 30ml", sku: "LUX-GLOW-30", brandId: brand1.id, price: 79, stock: 120, category: "Skincare" } }),
    prisma.product.create({ data: { name: "Hydra Cleanser", sku: "LUX-HYDRA-01", brandId: brand1.id, price: 45, stock: 80, category: "Skincare" } }),
    prisma.product.create({ data: { name: "Power Bank 20k", sku: "NUSA-PB-20K", brandId: brand2.id, price: 129, stock: 45, category: "Gadget" } }),
  ]);

  const customer = await prisma.customer.create({ data: { name: "Nur Aisyah Binti Rahman", phone: "60129876543", email: "aisyah.rahman@gmail.com" } });
  const address = await prisma.address.create({ data: { customerId: customer.id, line1: "No 21, Jalan Setia 3", postcode: "40170", city: "Shah Alam", state: "Selangor", country: "Malaysia", isDefault: true } });

  const order = await prisma.order.create({
    data: {
      orderNo: "OMS-20260415-0001",
      source: "website",
      customerId: customer.id,
      addressId: address.id,
      sellerId: users[3].id,
      paymentMethod: PaymentMethod.cod,
      shippingMethod: ShippingMethod.jnt,
      status: OrderStatus.in_transit,
      subtotal: 124,
      shippingFee: 10,
      total: 134,
      notes: "Customer prefers evening delivery",
      items: {
        create: [
          { productId: products[0].id, productName: products[0].name, sku: products[0].sku, qty: 1, unitPrice: 79, totalPrice: 79 },
          { productId: products[1].id, productName: products[1].name, sku: products[1].sku, qty: 1, unitPrice: 45, totalPrice: 45 },
        ],
      },
    },
  });

  const shipment = await prisma.shipment.create({
    data: {
      orderId: order.id,
      courierCode: "JNT",
      trackingNo: "JNTMY123456789",
      awbNo: "AWB123456789",
      labelUrl: "https://example.com/labels/AWB123456789.pdf",
      shipmentStatus: ShipmentStatus.in_transit,
      rawResponse: { provider: "mock", createdAt: new Date().toISOString() },
    },
  });

  await prisma.shipmentTrackingLog.createMany({
    data: [
      { shipmentId: shipment.id, event: "created", description: "Shipment created" },
      { shipmentId: shipment.id, event: "picked_up", description: "Parcel picked up" },
    ],
  });

  await prisma.commission.create({ data: { orderId: order.id, sellerId: users[3].id, amount: 13.4, status: CommissionStatus.pending } });

  await prisma.courierIntegration.createMany({
    data: [
      { courierCode: "JNT", name: "J&T Express", config: { mocked: true } },
      { courierCode: "SPX", name: "SPX Express", config: { mocked: true } },
      { courierCode: "MOCK", name: "Mock Courier", config: { mocked: true } },
    ],
  });

  console.log("Seed completed. Login: superadmin@luxana.my / Admin@123");
}

main().finally(async () => prisma.$disconnect());
