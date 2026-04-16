import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return (
    <ModulePage
      title="Users List"
      description="Internal user directory with role and activity status."
      cta={{ label: "Go to Dashboard", href: "/admin/dashboard" }}
    />
  );
}
