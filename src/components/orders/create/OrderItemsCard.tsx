import { formatCurrency } from "@/lib/utils";
import { OrderItemRow, ProductOption } from "./types";

type OrderItemsCardProps = {
  products: ProductOption[];
  selectedProductId: string;
  onSelectedProductIdChange: (value: string) => void;
  onAddProduct: () => void;
  onAddBundle: () => void;
  isBundleReady?: boolean;
  items: OrderItemRow[];
  onQtyChange: (productId: string, qty: number) => void;
  onRemoveItem: (productId: string) => void;
};

export function OrderItemsCard({
  products,
  selectedProductId,
  onSelectedProductIdChange,
  onAddProduct,
  onAddBundle,
  isBundleReady = false,
  items,
  onQtyChange,
  onRemoveItem,
}: OrderItemsCardProps) {
  return (
    <section className="panel p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-100">Order items</h2>
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-lg border border-border px-3 py-2 text-xs disabled:cursor-not-allowed disabled:opacity-60"
            onClick={onAddBundle}
            disabled={!isBundleReady}
            title={isBundleReady ? "Add bundle" : "Bundle order is coming soon"}
          >
            Add bundle
          </button>
          <button type="button" className="btn px-3 py-2 text-xs" onClick={onAddProduct}>
            Add product
          </button>
        </div>
      </div>

      <select
        id="product-picker"
        name="productPicker"
        className="input mb-3"
        value={selectedProductId}
        onChange={(e) => onSelectedProductIdChange(e.target.value)}
      >
        <option value="">Select a product</option>
        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name} ({product.sku}) - {formatCurrency(product.price)}
          </option>
        ))}
      </select>

      <div className="space-y-2">
        {items.length === 0 ? (
          <p className="rounded-lg border border-dashed border-border p-3 text-sm text-slate-400">No item selected yet.</p>
        ) : null}
        {items.map((item) => (
          <div key={item.productId} className="rounded-xl border border-border bg-slate-900/60 p-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-100">{item.productName}</p>
                <p className="text-xs text-slate-400">{item.sku}</p>
              </div>
              <button
                type="button"
                className="text-xs text-rose-300 hover:text-rose-200"
                onClick={() => onRemoveItem(item.productId)}
              >
                Remove
              </button>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="rounded-md border border-border px-2"
                  onClick={() => onQtyChange(item.productId, Math.max(1, item.qty - 1))}
                >
                  -
                </button>
                <input
                  id={`qty-${item.productId}`}
                  name={`qty-${item.productId}`}
                  type="number"
                  min={1}
                  className="w-14 rounded-md border border-border bg-slate-950 px-2 py-1 text-center text-sm"
                  value={item.qty}
                  onChange={(e) => onQtyChange(item.productId, Math.max(1, Number(e.target.value) || 1))}
                />
                <button
                  type="button"
                  className="rounded-md border border-border px-2"
                  onClick={() => onQtyChange(item.productId, item.qty + 1)}
                >
                  +
                </button>
              </div>
              <div className="text-sm text-slate-200">{formatCurrency(item.qty * item.unitPrice)}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
