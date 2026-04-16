import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return (
    <ModulePage
      title="Stock Adjustment"
      description="Add or deduct stock with audit-ready reasons and notes."
      cta={{ label: "Go to Dashboard", href: "/admin/dashboard" }}
      emptyTitle="No adjustments yet"
      emptyHint="Submit a stock adjustment to initialize log history."
    />
  );
}
