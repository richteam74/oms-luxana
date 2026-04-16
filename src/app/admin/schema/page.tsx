import Link from "next/link";

export default function SchemaPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-5">
        <h2 className="text-2xl font-semibold">Database & Security Assets</h2>
        <p className="mt-1 text-sm text-slate-400">Supabase schema, RLS policies, and seed scripts are versioned in the repository.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Schema SQL", "/supabase/schema.sql"],
          ["RLS Policies", "/supabase/rls.sql"],
          ["Seed SQL", "/supabase/seed.sql"],
        ].map(([label, file]) => (
          <article key={label} className="rounded-2xl border border-border bg-card p-4">
            <h3 className="font-medium">{label}</h3>
            <p className="mt-2 text-xs text-slate-400">{file}</p>
            <Link href="/admin/docs/quick-start" className="mt-3 inline-flex text-sm text-blue-300 underline">
              Open docs
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
