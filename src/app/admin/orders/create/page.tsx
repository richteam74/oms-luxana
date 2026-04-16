import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return (
    <ModulePage
      title="Create Order"
      description="Create single or bulk orders with strict validation, SKU checks, and Malaysia shipping details."
      cta={{ label: "Go to Dashboard", href: "/admin/dashboard" }}
      emptyTitle="No order draft yet"
      emptyHint="Start with Single Order or upload CSV for Bulk Order."
    />
  );
}
