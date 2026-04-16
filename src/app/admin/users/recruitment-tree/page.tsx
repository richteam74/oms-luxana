import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return (
    <ModulePage
      title="Recruitment Tree"
      description="Team hierarchy view for referral/recruitment structures."
      cta={{ label: "Go to Dashboard", href: "/admin/dashboard" }}
    />
  );
}
