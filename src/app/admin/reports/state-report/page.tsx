import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return (
    <ModulePage
      title="State Report"
      description="Revenue and completion/return ranking by state."
      cta={{ label: "Go to Dashboard", href: "/admin/dashboard" }}
    />
  );
}
