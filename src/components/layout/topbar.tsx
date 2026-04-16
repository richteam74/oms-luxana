export function Topbar() {
  return (
    <header className="mb-6 flex items-center justify-between border-b border-border pb-4">
      <div>
        <h1 className="text-xl font-semibold">RichApps</h1>
        <p className="text-xs text-slate-400">Premium Ecommerce Operations Command Center</p>
      </div>
      <span className="rounded-full border border-border bg-card px-3 py-1 text-xs text-slate-300">MY Operations • Realtime Enabled</span>
    </header>
  );
}
