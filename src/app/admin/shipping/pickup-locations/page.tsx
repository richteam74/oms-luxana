import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return (
    <ModulePage
      title="Pickup Locations"
      description="Manage sender origin locations with default warehouse routing."
      cta={{ label: "Go to Dashboard", href: "/admin/dashboard" }}
      emptyTitle="No pickup locations"
      emptyHint="Add your first pickup location for outbound shipments."
    />
  );
}
