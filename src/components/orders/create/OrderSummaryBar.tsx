import { formatCurrency } from "@/lib/utils";

type OrderSummaryBarProps = {
  subtotal: number;
  shippingFee: number;
  sellingPrice: number;
  onSellingPriceChange: (value: number) => void;
  isSubmitting: boolean;
  onCancel: () => void;
};

export function OrderSummaryBar({
  subtotal,
  shippingFee,
  sellingPrice,
  onSellingPriceChange,
  isSubmitting,
  onCancel,
}: OrderSummaryBarProps) {
  return (
    <section className="panel p-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1 text-sm text-slate-300">
          <p>Subtotal: {formatCurrency(subtotal)}</p>
          <p>Shipping: {formatCurrency(shippingFee)}</p>
          <p className="font-semibold text-slate-100">Total: {formatCurrency(sellingPrice)}</p>
        </div>
        <div className="space-y-2">
          <label htmlFor="selling-price" className="text-xs uppercase tracking-wide text-slate-400">
            Selling price (manual override)
          </label>
          <input
            id="selling-price"
            name="sellingPrice"
            type="number"
            min={0}
            step="0.01"
            className="input"
            value={Number.isNaN(sellingPrice) ? 0 : sellingPrice}
            onChange={(e) => onSellingPriceChange(Number(e.target.value) || 0)}
          />
        </div>
      </div>
      <div className="mt-4 flex flex-wrap justify-end gap-2">
        <button type="button" className="rounded-lg border border-border px-4 py-2 text-sm" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </button>
        <button type="submit" className="btn" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Order"}
        </button>
      </div>
    </section>
  );
}
