import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return (
    <ModulePage
      title="Sales Channels"
      description="Performance by external source channels and integration ownership."
      cta={{ label: "Go to Dashboard", href: "/admin/dashboard" }}
    />
  );
}
