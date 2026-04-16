import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return (
    <ModulePage
      title="Brands"
      description="Create and manage product brands for analytics and filters."
      cta={{ label: "Go to Dashboard", href: "/admin/dashboard" }}
      emptyTitle="No brands found"
      emptyHint="Create brand records before assigning products."
    />
  );
}
