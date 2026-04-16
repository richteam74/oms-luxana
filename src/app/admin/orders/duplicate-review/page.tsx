import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return (
    <ModulePage
      title="Duplicate Review"
      description="Operational duplicate detection grouped by confidence, reason, and review workflow."
      cta={{ label: "Go to Dashboard", href: "/admin/dashboard" }}
      emptyTitle="Duplicate Alert"
      emptyHint="No potential duplicate groups detected at this moment."
    />
  );
}
