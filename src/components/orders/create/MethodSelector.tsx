import { cn } from "@/lib/utils";

type Option<T extends string> = {
  value: T;
  label: string;
  description?: string;
};

type MethodSelectorProps<T extends string> = {
  id: string;
  label: string;
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
};

export function MethodSelector<T extends string>({ id, label, options, value, onChange }: MethodSelectorProps<T>) {
  return (
    <fieldset>
      <legend className="mb-2 text-xs uppercase tracking-wide text-slate-400">{label}</legend>
      <div className="grid gap-2 sm:grid-cols-3">
        {options.map((option) => {
          const checked = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              id={`${id}-${option.value}`}
              className={cn(
                "rounded-xl border px-3 py-2 text-left transition",
                checked
                  ? "border-accent bg-accent/15 text-slate-100"
                  : "border-border bg-slate-900/50 text-slate-300 hover:border-slate-500",
              )}
              onClick={() => onChange(option.value)}
              aria-pressed={checked}
            >
              <div className="text-sm font-medium">{option.label}</div>
              {option.description ? <div className="text-xs text-slate-400">{option.description}</div> : null}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
