import Link from "next/link";
import { prisma } from "@/lib/db";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatCurrency } from "@/lib/utils";
import { OrderStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

const statusOptions: Array<"all" | OrderStatus> = ["all", "new", "pending", "in_transit", "completed", "returned", "rejected"];

export default async function OrdersPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; status?: string }>;
}) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const q = resolvedSearchParams.q?.trim() ?? "";
  const status = resolvedSearchParams.status ?? "all";

  const orders = await prisma.order.findMany({
    where: {
      status: status !== "all" && statusOptions.includes(status as OrderStatus) ? (status as OrderStatus) : undefined,
      OR: q
        ? [
            { orderNo: { contains: q, mode: "insensitive" } },
            { customer: { name: { contains: q, mode: "insensitive" } } },
            { customer: { phone: { contains: q.replace(/\s+/g, "").replace(/-/g, "") } } },
          ]
        : undefined,
    },
    take: 50,
    orderBy: { createdAt: "desc" },
    include: { customer: true, seller: true },
  });

  return (
    <div className="space-y-4">
      <form className="panel grid gap-3 p-4 md:grid-cols-[1fr_220px_auto]">
        <input className="input" name="q" defaultValue={q} placeholder="Search order no, phone, or customer name" />
        <select className="input" name="status" defaultValue={status}>
          {statusOptions.map((statusOption) => (
            <option key={statusOption} value={statusOption}>
              {statusOption === "all" ? "All status" : statusOption}
            </option>
          ))}
        </select>
        <button className="btn" type="submit">
          Apply Filters
        </button>
      </form>
      <div className="panel overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left text-slate-400"><tr><th className="p-3">Customer</th><th>Seller</th><th>Order Details</th><th>Payment/Shipping</th><th>Amount</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-border">
                <td className="p-3">{order.customer.name}<div className="text-xs text-slate-500">{order.customer.phone}</div></td>
                <td>{order.seller?.name ?? "Unassigned"}</td>
                <td>{order.orderNo}</td>
                <td>{order.paymentMethod} / {order.shippingMethod}</td>
                <td>{formatCurrency(Number(order.total))}</td>
                <td><StatusBadge value={order.status} /></td>
                <td className="space-x-2">
                  <Link href={`/admin/orders?q=${encodeURIComponent(order.orderNo)}`} className="text-accent hover:underline">
                    View
                  </Link>
                  <Link href="/admin/shipment/generate-awb" className="text-accent hover:underline">
                    AWB
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 ? <p className="p-3 text-sm text-slate-400">No orders found for the selected filters.</p> : null}
      </div>
    </div>
  );
}
