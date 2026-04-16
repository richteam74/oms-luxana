import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return (
    <ModulePage
      title="Sales Breakdown"
      description="Customer mix, retention, AOV, completion, and payment split."
      cta={{ label: "Go to Dashboard", href: "/admin/dashboard" }}
    />
  );
}
