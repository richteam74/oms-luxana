import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return (
    <ModulePage
      title="Seller Summary"
      description="Leaderboard across revenue, AOV, completion, and return rates."
      cta={{ label: "Go to Dashboard", href: "/admin/dashboard" }}
    />
  );
}
