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

export type OrderStatus =
  | "pending"
  | "paid"
  | "in_production"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

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
