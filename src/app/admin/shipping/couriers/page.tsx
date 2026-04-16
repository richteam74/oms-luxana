import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return (
    <ModulePage
      title="Couriers"
      description="Courier account management with environment, credentials, and capability toggles."
      cta={{ label: "Go to Dashboard", href: "/admin/dashboard" }}
      emptyTitle="No courier accounts configured"
      emptyHint="Connect J&T, SPX, or Self Pickup accounts to begin."
    />
  );
}
