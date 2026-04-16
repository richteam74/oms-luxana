import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return (
    <ModulePage
      title="Pending Stock"
      description="Forecast SKU shortage for pending and new orders."
      cta={{ label: "Go to Dashboard", href: "/admin/dashboard" }}
      emptyTitle="No shortages currently"
      emptyHint="Pending stock gaps will appear when demand exceeds stock."
    />
  );
}
