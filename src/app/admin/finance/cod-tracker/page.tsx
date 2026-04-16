import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return (
    <ModulePage
      title="COD Tracker"
      description="SOA upload, paid/unpaid reconciliation, and matching diagnostics."
      cta={{ label: "Go to Dashboard", href: "/admin/dashboard" }}
    />
  );
}
