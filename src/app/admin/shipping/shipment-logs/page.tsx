import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return (
    <ModulePage
      title="Shipment Logs"
      description="Detailed push and AWB logs with raw request/response payloads."
      cta={{ label: "Go to Dashboard", href: "/admin/dashboard" }}
      emptyTitle="No shipment logs yet"
      emptyHint="Shipment attempts will appear here for troubleshooting."
    />
  );
}
