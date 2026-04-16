import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return (
    <ModulePage
      title="Export Orders"
      description="Export filtered order datasets with column selection and history."
      cta={{ label: "Go to Dashboard", href: "/admin/dashboard" }}
    />
  );
}
