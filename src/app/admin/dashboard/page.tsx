import { MonthlySalesChart, OrdersRevenueChart } from "@/components/dashboard/charts";
import { ModulePage } from "@/components/shared/module-page";
import { formatCurrency } from "@/lib/utils";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <ModulePage
        title="Dashboard"
        description="Realtime operations control for orders, shipments, inventory, and finance."
        kpis={[
          { label: "Today sales", value: "124" },
          { label: "Today revenue", value: formatCurrency(18492.5), tone: "success" },
          { label: "Today orders", value: "72" },
          { label: "Live orders", value: "19", tone: "warning" },
          { label: "Yearly sales", value: formatCurrency(1894220), tone: "success" },
        ]}
        cta={{ label: "Create your first order", href: "/admin/orders/create" }}
        emptyTitle="Live updates block"
        emptyHint="Connect your first Custom API integration, add products, and configure courier accounts to activate live insights."
      />

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="panel p-4">
          <h3 className="mb-3 font-medium">Monthly sales summary</h3>
          <MonthlySalesChart />
        </div>
        <div className="panel p-4">
          <h3 className="mb-3 font-medium">Revenue and orders trend</h3>
          <OrdersRevenueChart />
        </div>
      </section>
    </div>
  );
}
