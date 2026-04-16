import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return (
    <ModulePage
      title="Net Profit"
      description="Gross/net profit tracker across operational cost components."
      cta={{ label: "Go to Dashboard", href: "/admin/dashboard" }}
    />
  );
}
