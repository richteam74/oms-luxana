import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return (
    <ModulePage
      title="Custom API"
      description="API integration console with keys, quotas, logs, and owner controls."
      cta={{ label: "Go to Dashboard", href: "/admin/dashboard" }}
    />
  );
}
