import type { ProductVariantOption, VariantAttributes } from "@/types/product";

interface LeanVariantDoc {
  sku: string;
  attributes?: VariantAttributes;
  priceDelta: number;
  fulfillmentType: "in-stock" | "made-to-order";
  inStock: boolean;
  leadTimeDays?: number;
}

export function toProductVariantOption(doc: LeanVariantDoc): ProductVariantOption {
  return {
    sku: doc.sku,
    attributes: doc.attributes ?? {},
    priceDelta: doc.priceDelta,
    fulfillmentType: doc.fulfillmentType,
    inStock: doc.inStock,
    leadTimeDays: doc.leadTimeDays,
  };
}
