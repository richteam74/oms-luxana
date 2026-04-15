export default function CreateOrderPage() {
  return (
    <div className="space-y-4">
      <div className="panel p-4">
        <h2 className="font-semibold mb-3">Create Order</h2>
        <div className="mb-4 flex gap-2"><button className="btn">Single Order</button><button className="rounded-lg border border-border px-4 py-2">Bulk Order</button></div>
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Customer Information</h3>
            <input className="input" placeholder="Name" />
            <input className="input" placeholder="Email (optional)" />
            <input className="input" placeholder="Phone" />
            <h3 className="text-sm font-medium pt-2">Delivery Address</h3>
            <input className="input" placeholder="Street address" />
            <input className="input" placeholder="Address 2 (optional)" />
            <div className="grid grid-cols-3 gap-2"><input className="input" placeholder="Postcode" /><input className="input" placeholder="City" /><input className="input" placeholder="State" /></div>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Order Settings</h3>
            <select className="input"><option>Cash on delivery</option><option>Bank transfer</option><option>Free of charge</option></select>
            <select className="input"><option>J&T Express</option><option>SPX Express</option><option>Self pickup</option></select>
            <textarea className="input min-h-28" placeholder="Order notes" />
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> Private note</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> AWB note</label>
            <input className="input" placeholder="Selling price (MYR)" />
            <div className="flex gap-2 pt-2"><button className="btn">Create Order</button><button className="rounded-lg border border-border px-4 py-2">Cancel</button></div>
          </div>
        </div>
      </div>

      <div className="panel p-4">
        <h3 className="font-medium mb-2">Bulk Order (CSV)</h3>
        <input className="input" type="file" accept=".csv" />
        <p className="text-xs text-slate-400 mt-2">Upload CSV, validate rows, preview and import in batch.</p>
      </div>
    </div>
  );
}
