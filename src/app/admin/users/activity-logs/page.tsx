import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return (
    <ModulePage
      title="Activity Logs"
      description="Audit history for data changes, auth, and critical actions."
      cta={{ label: "Go to Dashboard", href: "/admin/dashboard" }}
    />
  );
}
