import { AddressForm } from "./types";

type AddressFormCardProps = {
  address: AddressForm;
  onAddressChange: (field: keyof AddressForm, value: string) => void;
  errors?: Partial<Record<keyof AddressForm, string>>;
};

export function AddressFormCard({ address, onAddressChange, errors }: AddressFormCardProps) {
  return (
    <section className="panel p-4">
      <h2 className="mb-3 text-sm font-semibold text-slate-100">Delivery address</h2>
      <div className="space-y-2">
        <input
          id="address-line1"
          name="addressLine1"
          className="input"
          placeholder="Street address"
          value={address.line1}
          onChange={(e) => onAddressChange("line1", e.target.value)}
          required
        />
        {errors?.line1 ? <p className="text-xs text-rose-300">{errors.line1}</p> : null}
        <input
          id="address-line2"
          name="addressLine2"
          className="input"
          placeholder="Address 2 (optional)"
          value={address.line2}
          onChange={(e) => onAddressChange("line2", e.target.value)}
        />
        <div className="grid gap-2 sm:grid-cols-3">
          <input
            id="address-postcode"
            name="postcode"
            className="input"
            placeholder="Postcode"
            value={address.postcode}
            onChange={(e) => onAddressChange("postcode", e.target.value)}
            required
          />
          {errors?.postcode ? <p className="text-xs text-rose-300 sm:col-span-1">{errors.postcode}</p> : null}
          <input
            id="address-city"
            name="city"
            className="input"
            placeholder="City"
            value={address.city}
            onChange={(e) => onAddressChange("city", e.target.value)}
            required
          />
          {errors?.city ? <p className="text-xs text-rose-300 sm:col-span-1">{errors.city}</p> : null}
          <input
            id="address-state"
            name="state"
            className="input"
            placeholder="State"
            value={address.state}
            onChange={(e) => onAddressChange("state", e.target.value)}
            required
          />
          {errors?.state ? <p className="text-xs text-rose-300 sm:col-span-1">{errors.state}</p> : null}
        </div>
        <input
          id="address-country"
          name="country"
          className="input"
          placeholder="Country"
          value={address.country}
          onChange={(e) => onAddressChange("country", e.target.value)}
          required
        />
        {errors?.country ? <p className="text-xs text-rose-300">{errors.country}</p> : null}
      </div>
    </section>
  );
}
