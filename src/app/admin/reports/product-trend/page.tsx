import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return (
    <ModulePage
      title="Product Trend"
      description="Product demand trendline and return-signal monitoring."
      cta={{ label: "Go to Dashboard", href: "/admin/dashboard" }}
    />
  );
}
