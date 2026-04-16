import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return (
    <ModulePage
      title="Bundles"
      description="Build bundle and upsale combinations with child SKU quantities."
      cta={{ label: "Go to Dashboard", href: "/admin/dashboard" }}
      emptyTitle="No bundles found"
      emptyHint="Create bundles for combined order ingestion flows."
    />
  );
}
