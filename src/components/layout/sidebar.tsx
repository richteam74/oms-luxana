"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { richAppsSidebar } from "@/config/sidebar";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 h-screen w-80 overflow-y-auto border-r border-border bg-[#081127] p-4">
      <div className="mb-6 rounded-2xl border border-border bg-card p-4">
        <p className="text-xs uppercase tracking-wider text-blue-300">Internal Operations</p>
        <h1 className="mt-1 text-2xl font-semibold text-white">RichApps</h1>
        <p className="mt-1 text-xs text-slate-400">Malaysia Ecommerce Command Center</p>
      </div>

      <nav className="space-y-2">
        {richAppsSidebar.map((section) => {
          const Icon = section.icon;
          if (section.href) {
            const active = pathname === section.href;
            return (
              <Link
                key={section.title}
                href={section.href}
                className={cn(
                  "flex items-center justify-between rounded-xl border px-3 py-2 text-sm transition",
                  active
                    ? "border-blue-500/50 bg-blue-500/10 text-blue-200"
                    : "border-transparent text-slate-300 hover:border-border hover:bg-card hover:text-white",
                )}
              >
                <span className="inline-flex items-center gap-2">
                  <Icon size={16} />
                  {section.title}
                </span>
                <ChevronRight size={14} />
              </Link>
            );
          }

          return (
            <div key={section.title} className="rounded-xl border border-border bg-card/60 p-2">
              <p className="mb-2 inline-flex items-center gap-2 px-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <Icon size={14} />
                {section.title}
              </p>
              <div className="space-y-1">
                {section.items?.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "block rounded-lg px-2 py-1.5 text-sm transition",
                        active
                          ? "bg-blue-500/15 text-blue-200"
                          : "text-slate-300 hover:bg-slate-800/70 hover:text-white",
                      )}
                    >
                      {item.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
