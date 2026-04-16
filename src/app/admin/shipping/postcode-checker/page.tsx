import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return (
    <ModulePage
      title="Postcode Checker"
      description="Malaysia and Brunei postcode coverage checks by postcode or state."
      cta={{ label: "Go to Dashboard", href: "/admin/dashboard" }}
      emptyTitle="No lookup history"
      emptyHint="Search postcode coverage to validate courier serviceability."
    />
  );
}
