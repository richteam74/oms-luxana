import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return (
    <ModulePage
      title="Stock Movement"
      description="Opening/closing and month-level stock-in/out performance."
      cta={{ label: "Go to Dashboard", href: "/admin/dashboard" }}
    />
  );
}
