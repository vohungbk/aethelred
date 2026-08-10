export interface OrderItemView {
  sku?: string;
  name: string;
  variantLabel?: string;
  unitPrice: number;
  quantity: number;
}

export interface OrderAddressView {
  name?: string;
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export const ORDER_STATUSES = [
  "pending",
  "paid",
  "in_production",
  "shipped",
  "delivered",
  "cancelled",
  "refunded",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export interface OrderLean {
  orderNumber: string;
  status: OrderStatus;
  paymentStatus: "unpaid" | "paid" | "refunded";
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  currency: string;
  items: OrderItemView[];
  shippingAddress?: OrderAddressView;
}
