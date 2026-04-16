import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return (
    <ModulePage
      title="Stock Summary"
      description="SKU health, zero stock, low stock, and movement signals."
      cta={{ label: "Go to Dashboard", href: "/admin/dashboard" }}
    />
  );
}
