import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return (
    <ModulePage
      title="Products"
      description="Track product and variation stock, low stock risk, and SKU health."
      cta={{ label: "Go to Dashboard", href: "/admin/dashboard" }}
      emptyTitle="No products found"
      emptyHint="Add your first product to start inventory control."
    />
  );
}
