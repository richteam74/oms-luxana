import Link from "next/link";

type ModulePageProps = {
  title: string;
  description: string;
  kpis?: Array<{ label: string; value: string; tone?: "default" | "success" | "warning" | "danger" }>;
  cta?: { label: string; href: string };
  emptyTitle?: string;
  emptyHint?: string;
};

export function ModulePage({ title, description, kpis = [], cta, emptyTitle, emptyHint }: ModulePageProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-5">
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        <p className="mt-1 text-sm text-slate-400">{description}</p>
      </div>

      {kpis.length > 0 && (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {kpis.map((kpi) => (
            <article key={kpi.label} className="rounded-2xl border border-border bg-card p-4">
              <p className="text-xs text-slate-400">{kpi.label}</p>
              <p
                className={`mt-2 text-2xl font-semibold ${
                  kpi.tone === "success"
                    ? "text-emerald-300"
                    : kpi.tone === "warning"
                      ? "text-amber-300"
                      : kpi.tone === "danger"
                        ? "text-rose-300"
                        : "text-white"
                }`}
              >
                {kpi.value}
              </p>
            </article>
          ))}
        </section>
      )}

      <section className="rounded-2xl border border-dashed border-border bg-card/40 p-10 text-center">
        <h3 className="text-lg font-medium">{emptyTitle ?? `No ${title.toLowerCase()} data yet`}</h3>
        <p className="mx-auto mt-2 max-w-xl text-sm text-slate-400">
          {emptyHint ?? "Connect integrations, create records, and activity will appear here in realtime."}
        </p>
        {cta ? (
          <Link href={cta.href} className="mt-5 inline-flex rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">
            {cta.label}
          </Link>
        ) : null}
      </section>
    </div>
  );
}
