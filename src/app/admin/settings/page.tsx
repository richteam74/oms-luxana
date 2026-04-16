import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return (
    <ModulePage
      title="Settings"
      description="Application settings, defaults, and operational policies."
      cta={{ label: "Go to Dashboard", href: "/admin/dashboard" }}
    />
  );
}
