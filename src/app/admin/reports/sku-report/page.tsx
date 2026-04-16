import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return (
    <ModulePage
      title="SKU Report"
      description="SKU-level units, revenue, trend, and top/bottom movers."
      cta={{ label: "Go to Dashboard", href: "/admin/dashboard" }}
    />
  );
}
