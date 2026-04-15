export type PaymentMethodOption = "cod" | "bank_transfer" | "foc";
export type ShippingMethodOption = "jnt" | "spx" | "self_pickup";

export type CustomerForm = {
  name: string;
  email: string;
  phone: string;
};

export type AddressForm = {
  line1: string;
  line2: string;
  postcode: string;
  city: string;
  state: string;
  country: string;
};

export type OrderItemRow = {
  productId: string;
  productName: string;
  sku: string;
  unitPrice: number;
  qty: number;
};

export type OrderNotesForm = {
  notes: string;
  privateNote: string;
  awbNote: string;
};

export type ProductOption = {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
};
