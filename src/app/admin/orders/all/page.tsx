import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return (
    <ModulePage
      title="All Orders"
      description="Searchable command table with duplicate flags, source order references, seller ownership, and bulk actions."
      cta={{ label: "Go to Dashboard", href: "/admin/dashboard" }}
      emptyTitle="No orders yet"
      emptyHint="Ingest orders from Webhook or Custom API to see records here."
    />
  );
}
