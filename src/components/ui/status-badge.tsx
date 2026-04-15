import { cn } from "@/lib/utils";

const map: Record<string, string> = {
  new: "bg-blue-500/20 text-blue-300",
  pending: "bg-yellow-500/20 text-yellow-200",
  in_transit: "bg-cyan-500/20 text-cyan-200",
  completed: "bg-emerald-500/20 text-emerald-200",
  returned: "bg-orange-500/20 text-orange-200",
  rejected: "bg-red-500/20 text-red-200",
};

export function StatusBadge({ value }: { value: string }) {
  return <span className={cn("rounded-full px-2 py-1 text-xs", map[value] ?? "bg-slate-600/40")}>{value.replaceAll("_", " ")}</span>;
}
