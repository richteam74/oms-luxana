import { prisma } from "@/lib/db";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatCurrency } from "@/lib/utils";

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({ take: 20, orderBy: { createdAt: "desc" }, include: { customer: true, seller: true } });

  return (
    <div className="space-y-4">
      <div className="panel p-4 grid md:grid-cols-4 gap-3">
        <input className="input" placeholder="Search phone" />
        <input className="input" placeholder="Search customer name" />
        <select className="input"><option>All status</option><option>new</option><option>pending</option><option>in_transit</option></select>
        <button className="btn">Bulk Actions</button>
      </div>
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
                <td className="space-x-2"><button className="text-accent">View</button><button className="text-accent">AWB</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
