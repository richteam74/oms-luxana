import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return (
    <ModulePage
      title="Stock Log"
      description="Full stock movement audit trail by type, reference, and reason."
      cta={{ label: "Go to Dashboard", href: "/admin/dashboard" }}
      emptyTitle="No stock movement logs"
      emptyHint="Stock activity will stream here after adjustments/orders."
    />
  );
}
