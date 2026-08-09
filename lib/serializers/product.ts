import type { ProductSummary } from "@/types/product";

interface LeanProductDoc {
  slug: string;
  name: string;
  descriptor: string;
  basePrice: number;
  currency?: string;
}

export function toProductSummary(doc: LeanProductDoc): ProductSummary {
  return {
    slug: doc.slug,
    name: doc.name,
    descriptor: doc.descriptor,
    price: doc.basePrice,
    currency: doc.currency,
  };
}
