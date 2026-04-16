import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return (
    <ModulePage
      title="Seller Detail"
      description="Seller drilldown analytics with status and SKU performance."
      cta={{ label: "Go to Dashboard", href: "/admin/dashboard" }}
    />
  );
}
