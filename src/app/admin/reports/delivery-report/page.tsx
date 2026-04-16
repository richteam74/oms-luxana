import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return (
    <ModulePage
      title="Delivery Report"
      description="Courier delivery outcomes and COD/prepaid split analysis."
      cta={{ label: "Go to Dashboard", href: "/admin/dashboard" }}
    />
  );
}
