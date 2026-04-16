import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return (
    <ModulePage
      title="Sales Overview"
      description="Period comparison for orders, revenue, and status distribution."
      cta={{ label: "Go to Dashboard", href: "/admin/dashboard" }}
    />
  );
}
