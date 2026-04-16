import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return (
    <ModulePage
      title="My Profile"
      description="User profile, preferences, and security activity management."
      cta={{ label: "Go to Dashboard", href: "/admin/dashboard" }}
    />
  );
}
