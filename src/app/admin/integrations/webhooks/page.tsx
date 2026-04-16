import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return (
    <ModulePage
      title="Webhooks"
      description="Webhook endpoint console with secrets, logs, and docs tabs."
      cta={{ label: "Go to Dashboard", href: "/admin/dashboard" }}
    />
  );
}
