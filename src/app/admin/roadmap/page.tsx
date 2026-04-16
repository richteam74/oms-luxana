const phases = [
  "Phase 1: app shell, auth, theme, sidebar, base schema",
  "Phase 2: products, brands, bundles, stock adjustments, stock log",
  "Phase 3: webhooks, custom API, inbound ingestion, all orders, create order, duplicates, realtime dashboard",
  "Phase 4: couriers, push orders, generate AWB, shipment logs, pickup locations, postcode checker",
  "Phase 5: reports and analytics",
  "Phase 6: finance",
  "Phase 7: users / roles / activity logs",
  "Phase 8: docs, seed data, polish, performance tuning",
];

export default function RoadmapPage() {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border bg-card p-5">
        <h2 className="text-2xl font-semibold">Implementation Roadmap</h2>
        <p className="mt-1 text-sm text-slate-400">Delivery sequencing for RichApps production rollout.</p>
      </div>
      <ol className="space-y-3">
        {phases.map((phase) => (
          <li key={phase} className="rounded-xl border border-border bg-card/70 px-4 py-3 text-sm text-slate-200">
            {phase}
          </li>
        ))}
      </ol>
    </div>
  );
}
