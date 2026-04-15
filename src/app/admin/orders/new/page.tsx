"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AddressFormCard } from "@/components/orders/create/AddressFormCard";
import { CustomerSearchCard } from "@/components/orders/create/CustomerSearchCard";
import { MethodSelector } from "@/components/orders/create/MethodSelector";
import { NotesCard } from "@/components/orders/create/NotesCard";
import { OrderItemsCard } from "@/components/orders/create/OrderItemsCard";
import { OrderSummaryBar } from "@/components/orders/create/OrderSummaryBar";
import { AddressForm, CustomerForm, OrderItemRow, PaymentMethodOption, ProductOption, ShippingMethodOption } from "@/components/orders/create/types";

const paymentOptions = [
  { value: "cod", label: "Cash on Delivery" },
  { value: "bank_transfer", label: "Bank Transfer" },
  { value: "foc", label: "Free of Charge" },
] as const;

const shippingOptions = [
  { value: "jnt", label: "J&T Express" },
  { value: "spx", label: "SPX Express" },
  { value: "self_pickup", label: "Self Pickup" },
] as const;

const defaultCustomer: CustomerForm = { name: "", email: "", phone: "" };
const defaultAddress: AddressForm = {
  line1: "",
  line2: "",
  postcode: "",
  city: "",
  state: "",
  country: "Malaysia",
};

export default function CreateOrderPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"single" | "bulk">("single");
  const [customerSearch, setCustomerSearch] = useState("");
  const [isSearchingCustomer, setIsSearchingCustomer] = useState(false);
  const [customer, setCustomer] = useState<CustomerForm>(defaultCustomer);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [address, setAddress] = useState<AddressForm>(defaultAddress);
  const [products, setProducts] = useState<ProductOption[]>([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [items, setItems] = useState<OrderItemRow[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodOption>("cod");
  const [shippingMethod, setShippingMethod] = useState<ShippingMethodOption>("jnt");
  const [notes, setNotes] = useState("");
  const [privateNote, setPrivateNote] = useState("");
  const [awbNote, setAwbNote] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [bundleMessage, setBundleMessage] = useState<string | null>(null);
  const [bulkFileName, setBulkFileName] = useState("");
  const [bulkError, setBulkError] = useState<string | null>(null);

  const shippingFee = shippingMethod === "self_pickup" ? 0 : 10;
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0), [items]);
  const [sellingPrice, setSellingPrice] = useState(0);

  const normalizePhone = (value: string) => value.replace(/\s+/g, "").replace(/-/g, "");

  const validateBeforeSubmit = () => {
    const nextErrors: Record<string, string> = {};
    const hasExistingCustomer = Boolean(selectedCustomerId?.trim());

    if (!hasExistingCustomer) {
      if (!customer.name.trim()) nextErrors["customer.name"] = "Customer name is required.";
      if (normalizePhone(customer.phone).length < 9) nextErrors["customer.phone"] = "Customer phone must be at least 9 digits.";
      if (customer.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email.trim())) {
        nextErrors["customer.email"] = "Customer email is invalid.";
      }
    }
    if (!address.line1.trim()) nextErrors["address.line1"] = "Address line 1 is required.";
    if (!address.postcode.trim()) nextErrors["address.postcode"] = "Postcode is required.";
    if (!address.city.trim()) nextErrors["address.city"] = "City is required.";
    if (!address.state.trim()) nextErrors["address.state"] = "State is required.";
    if (items.length < 1) nextErrors.items = "Please add at least one product.";
    if (items.some((item) => item.qty < 1)) nextErrors.items = "Each item quantity must be at least 1.";

    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  useEffect(() => {
    setSellingPrice(subtotal + shippingFee);
  }, [subtotal, shippingFee]);

  useEffect(() => {
    const loadProducts = async () => {
      const res = await fetch("/api/products", { cache: "no-store" });
      const json = await res.json();
      const rows = (json.data ?? []).map((product: { id: string; name: string; sku: string; price: string | number; stock: number }) => ({
        id: product.id,
        name: product.name,
        sku: product.sku,
        price: Number(product.price),
        stock: Number(product.stock),
      }));
      setProducts(rows);
    };

    void loadProducts();
  }, []);

  const addProduct = () => {
    const product = products.find((entry) => entry.id === selectedProductId);
    if (!product) {
      setFormError("Please select a product first.");
      return;
    }

    setFormError(null);
    setItems((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      if (existing) {
        return prev.map((item) => (item.productId === product.id ? { ...item, qty: item.qty + 1 } : item));
      }
      return [
        ...prev,
        {
          productId: product.id,
          productName: product.name,
          sku: product.sku,
          unitPrice: product.price,
          qty: 1,
        },
      ];
    });
  };

  const searchCustomer = async () => {
    if (!customerSearch.trim()) {
      setFormError("Please enter a phone number or order ID to search.");
      return;
    }
    setIsSearchingCustomer(true);
    setFormError(null);

    try {
      const response = await fetch(`/api/customers/search?q=${encodeURIComponent(customerSearch.trim())}`);
      const result = await response.json();

      if (!response.ok) {
        setFormError(result.error ?? "Unable to search customer.");
        return;
      }

      if (!result.data) {
        setSelectedCustomerId(null);
        setFormError("No matching customer found. You can continue with manual entry.");
        return;
      }

      setCustomer({
        name: result.data.name ?? "",
        email: result.data.email ?? "",
        phone: result.data.phone ?? "",
      });
      setSelectedCustomerId(result.data.id ?? null);

      setAddress({
        line1: result.data.address?.line1 ?? "",
        line2: result.data.address?.line2 ?? "",
        postcode: result.data.address?.postcode ?? "",
        city: result.data.address?.city ?? "",
        state: result.data.address?.state ?? "",
        country: result.data.address?.country ?? "Malaysia",
      });
      setFormSuccess("Customer found and prefilled.");
      setFormError(null);
      setFieldErrors({});
    } catch {
      setFormError("Network error while searching customer.");
    } finally {
      setIsSearchingCustomer(false);
    }
  };

  const onSubmitSingleOrder = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    setFormSuccess(null);
    setFieldErrors({});

    const isValid = validateBeforeSubmit();
    if (!isValid) {
      setFormError("Please fix the highlighted fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "admin",
          customerId: selectedCustomerId ?? undefined,
          customer,
          address,
          paymentMethod,
          shippingMethod,
          items: items.map((item) => ({
            productId: item.productId,
            qty: item.qty,
            unitPrice: item.unitPrice,
          })),
          notes,
          privateNote,
          awbNote,
          sellingPrice,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result?.details && typeof result.details === "object") {
          const nextErrors: Record<string, string> = {};
          for (const [field, messages] of Object.entries(result.details as Record<string, string[]>)) {
            const message = messages.find(Boolean);
            if (message) nextErrors[field] = message;
          }
          setFieldErrors(nextErrors);
        }
        setFormError(result.error ?? "Failed to create order.");
        return;
      }

      setFormSuccess(`Order ${result.data.orderNo} created successfully.`);
      setTimeout(() => router.push(`/admin/orders`), 800);
    } catch {
      setFormError("Unexpected error while creating order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="panel p-2">
        <div className="flex gap-2">
          <button
            type="button"
            className={`rounded-lg px-4 py-2 text-sm ${activeTab === "single" ? "bg-accent text-white" : "text-slate-300"}`}
            onClick={() => setActiveTab("single")}
          >
            Single Order
          </button>
          <button
            type="button"
            className={`rounded-lg px-4 py-2 text-sm ${activeTab === "bulk" ? "bg-accent text-white" : "text-slate-300"}`}
            onClick={() => setActiveTab("bulk")}
          >
            Bulk Order
          </button>
        </div>
      </div>

      {activeTab === "single" ? (
        <form className="space-y-4" onSubmit={onSubmitSingleOrder}>
          {formError ? <div className="rounded-lg border border-rose-500/40 bg-rose-500/10 p-3 text-sm text-rose-100">{formError}</div> : null}
          {formSuccess ? <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-100">{formSuccess}</div> : null}
          {bundleMessage ? <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-sm text-amber-100">{bundleMessage}</div> : null}
          <div className="grid gap-4 xl:grid-cols-2">
            <div className="space-y-4">
              <CustomerSearchCard
                searchValue={customerSearch}
                onSearchValueChange={setCustomerSearch}
                onSearch={searchCustomer}
                isSearching={isSearchingCustomer}
                customer={customer}
                onCustomerChange={(field, value) => {
                  setSelectedCustomerId(null);
                  setCustomer((prev) => ({ ...prev, [field]: value }));
                  setFieldErrors((prev) => {
                    const next = { ...prev };
                    delete next[`customer.${field}`];
                    delete next.customerId;
                    return next;
                  });
                }}
                errors={{
                  customerId: fieldErrors.customerId,
                  name: fieldErrors["customer.name"],
                  email: fieldErrors["customer.email"],
                  phone: fieldErrors["customer.phone"],
                }}
              />
              <AddressFormCard
                address={address}
                onAddressChange={(field, value) => {
                  setAddress((prev) => ({ ...prev, [field]: value }));
                  setFieldErrors((prev) => {
                    const next = { ...prev };
                    delete next[`address.${field}`];
                    return next;
                  });
                }}
                errors={{
                  line1: fieldErrors["address.line1"],
                  line2: fieldErrors["address.line2"],
                  postcode: fieldErrors["address.postcode"],
                  city: fieldErrors["address.city"],
                  state: fieldErrors["address.state"],
                  country: fieldErrors["address.country"],
                }}
              />
            </div>
            <div className="space-y-4">
              <OrderItemsCard
                products={products}
                selectedProductId={selectedProductId}
                onSelectedProductIdChange={setSelectedProductId}
                onAddProduct={addProduct}
                onAddBundle={() => setBundleMessage("Bundle order flow is not available yet. Please add products individually for now.")}
                isBundleReady={false}
                items={items}
                onQtyChange={(productId, qty) => setItems((prev) => prev.map((row) => (row.productId === productId ? { ...row, qty } : row)))}
                onRemoveItem={(productId) => setItems((prev) => prev.filter((row) => row.productId !== productId))}
                error={fieldErrors.items}
              />

              <section className="panel space-y-4 p-4">
                <MethodSelector<PaymentMethodOption>
                  id="payment-method"
                  label="Payment method"
                  options={paymentOptions.map((entry) => ({ ...entry }))}
                  value={paymentMethod}
                  onChange={setPaymentMethod}
                />
                <MethodSelector<ShippingMethodOption>
                  id="shipping-method"
                  label="Shipping method"
                  options={shippingOptions.map((entry) => ({ ...entry }))}
                  value={shippingMethod}
                  onChange={setShippingMethod}
                />
              </section>

              <NotesCard
                notes={notes}
                privateNote={privateNote}
                awbNote={awbNote}
                onNotesChange={setNotes}
                onPrivateNoteChange={setPrivateNote}
                onAwbNoteChange={setAwbNote}
              />

              <OrderSummaryBar
                subtotal={subtotal}
                shippingFee={shippingFee}
                sellingPrice={sellingPrice}
                onSellingPriceChange={setSellingPrice}
                isSubmitting={isSubmitting}
                onCancel={() => router.push("/admin/orders")}
              />
            </div>
          </div>
        </form>
      ) : (
        <section className="panel p-5">
          <div className="mx-auto max-w-2xl space-y-3">
            <h2 className="text-lg font-semibold">Bulk order upload</h2>
            <p className="text-sm text-slate-400">Upload CSV for batch order creation. Validation runs before import to prevent bad rows.</p>
            <label
              htmlFor="bulk-file"
              className="flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-slate-900/40 px-6 text-center"
            >
              <span className="text-sm text-slate-200">Drag & drop CSV or click to upload</span>
              <span className="mt-1 text-xs text-slate-400">Expected columns: customer_name, phone, address, sku, qty, payment_method, shipping_method</span>
              <input
                id="bulk-file"
                name="bulkFile"
                type="file"
                accept=".csv"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  if (!file.name.toLowerCase().endsWith(".csv")) {
                    setBulkError("Please upload a CSV file only.");
                    return;
                  }
                  setBulkError(null);
                  setBulkFileName(file.name);
                }}
              />
            </label>
            {bulkFileName ? <p className="text-sm text-emerald-300">Selected file: {bulkFileName}</p> : null}
            {bulkError ? <p className="text-sm text-rose-300">{bulkError}</p> : null}
            <div className="rounded-xl border border-border bg-slate-950/40 p-3 text-xs text-slate-400">
              Backend importer is pending. UI shell and file validation are ready.
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
