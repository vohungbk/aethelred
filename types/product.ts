export interface ProductSummary {
  slug: string;
  name: string;
  descriptor: string;
  price: number;
  currency?: string;
}

export interface VariantAttributes {
  fabric?: string;
  finish?: string;
  size?: string;
  legColor?: string;
}

export interface ProductVariantOption {
  sku: string;
  attributes: VariantAttributes;
  priceDelta: number;
  fulfillmentType: "in-stock" | "made-to-order";
  inStock: boolean;
  leadTimeDays?: number;
}

export interface ProductDetail extends ProductSummary {
  description: string;
  category: string;
  variants: ProductVariantOption[];
}
