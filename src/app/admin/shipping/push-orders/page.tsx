import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return (
    <ModulePage
      title="Push Orders"
      description="Queue eligible orders and push selected batches to enabled courier accounts."
      cta={{ label: "Go to Dashboard", href: "/admin/dashboard" }}
      emptyTitle="No orders ready to push"
      emptyHint="Approve orders and configure couriers first."
    />
  );
}
