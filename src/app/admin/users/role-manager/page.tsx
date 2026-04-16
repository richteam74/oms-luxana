import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return (
    <ModulePage
      title="Role Manager"
      description="Role-based access control for operational modules."
      cta={{ label: "Go to Dashboard", href: "/admin/dashboard" }}
    />
  );
}
