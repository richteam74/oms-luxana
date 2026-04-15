import { CustomerForm } from "./types";

type CustomerSearchCardProps = {
  searchValue: string;
  onSearchValueChange: (value: string) => void;
  onSearch: () => void;
  isSearching: boolean;
  customer: CustomerForm;
  onCustomerChange: (field: keyof CustomerForm, value: string) => void;
  errors?: {
    customerId?: string;
    name?: string;
    email?: string;
    phone?: string;
  };
};

export function CustomerSearchCard({
  searchValue,
  onSearchValueChange,
  onSearch,
  isSearching,
  customer,
  onCustomerChange,
  errors,
}: CustomerSearchCardProps) {
  return (
    <section className="panel p-4">
      <h2 className="mb-3 text-sm font-semibold text-slate-100">Customer</h2>
      {errors?.customerId ? <p className="mb-2 text-xs text-rose-300">{errors.customerId}</p> : null}
      <div className="mb-3 grid gap-2 sm:grid-cols-[1fr_auto]">
        <input
          id="customer-search"
          name="customerSearch"
          className="input"
          placeholder="Search by phone or order ID"
          value={searchValue}
          onChange={(e) => onSearchValueChange(e.target.value)}
        />
        <button type="button" className="btn" onClick={onSearch} disabled={isSearching}>
          {isSearching ? "Searching..." : "Search"}
        </button>
      </div>

      <div className="space-y-2">
        <input
          id="customer-name"
          name="customerName"
          className="input"
          placeholder="Customer name"
          value={customer.name}
          onChange={(e) => onCustomerChange("name", e.target.value)}
        />
        {errors?.name ? <p className="text-xs text-rose-300">{errors.name}</p> : null}
        <input
          id="customer-email"
          name="customerEmail"
          className="input"
          placeholder="Email (optional)"
          value={customer.email}
          onChange={(e) => onCustomerChange("email", e.target.value)}
        />
        {errors?.email ? <p className="text-xs text-rose-300">{errors.email}</p> : null}
        <input
          id="customer-phone"
          name="customerPhone"
          className="input"
          placeholder="Phone"
          value={customer.phone}
          onChange={(e) => onCustomerChange("phone", e.target.value)}
        />
        {errors?.phone ? <p className="text-xs text-rose-300">{errors.phone}</p> : null}
      </div>
    </section>
  );
}
