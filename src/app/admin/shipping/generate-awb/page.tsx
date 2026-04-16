import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return (
    <ModulePage
      title="Generate AWB"
      description="Generate airway bills, tracking numbers, and label URLs from pushed shipments."
      cta={{ label: "Go to Dashboard", href: "/admin/dashboard" }}
      emptyTitle="No AWB jobs ready"
      emptyHint="Push orders to couriers before generating AWB."
    />
  );
}
