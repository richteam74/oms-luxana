import { MonthlySalesChart, OrdersRevenueChart } from "@/components/dashboard/charts";
import { formatCurrency } from "@/lib/utils";

const cards = [
  ["Today Sales", formatCurrency(5480)],
  ["Today Revenue", formatCurrency(4920)],
  ["Today Orders", "42"],
  ["Paid vs COD", "18 / 24"],
  ["Top Channel", "TikTok Shop"],
  ["Top Products", "Glow Serum"],
  ["Retention Rate", "33%"],
  ["AOV", formatCurrency(130.4)],
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map(([label, value]) => <div key={label} className="panel p-4"><p className="text-xs text-slate-400">{label}</p><p className="mt-2 text-xl font-semibold">{value}</p></div>)}
      </section>
      <section className="grid gap-4 lg:grid-cols-2">
        <div className="panel p-4"><h2 className="mb-3 font-medium">Monthly Sales</h2><MonthlySalesChart /></div>
        <div className="panel p-4"><h2 className="mb-3 font-medium">Orders vs Revenue</h2><OrdersRevenueChart /></div>
      </section>
    </div>
  );
}
