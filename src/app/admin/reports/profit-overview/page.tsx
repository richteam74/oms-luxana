import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return (
    <ModulePage
      title="Profit Overview"
      description="Revenue, COGS, shipping, COD fees, and margin analytics."
      cta={{ label: "Go to Dashboard", href: "/admin/dashboard" }}
    />
  );
}
