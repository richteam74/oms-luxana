import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return (
    <ModulePage
      title="Couriers Integrations"
      description="Courier integration catalog with account-level health and usage stats."
      cta={{ label: "Go to Dashboard", href: "/admin/dashboard" }}
    />
  );
}
