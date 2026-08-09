"use client";

import { useMemo, useState } from "react";
import { AddToCartForm } from "@/components/features/product/AddToCartForm";
import { VariantSelector } from "@/components/features/product/VariantSelector";
import { formatPrice } from "@/lib/utils/price";
import type { ProductDetail } from "@/types/product";

export function ProductPurchasePanel({ product }: { product: ProductDetail }) {
  const [selectedSku, setSelectedSku] = useState<string | null>(product.variants[0]?.sku ?? null);

  const selectedVariant = useMemo(
    () => product.variants.find((variant) => variant.sku === selectedSku) ?? null,
    [product.variants, selectedSku],
  );

  const displayPrice = product.price + (selectedVariant?.priceDelta ?? 0);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-display-h1 text-text-primary">{product.name}</h1>
        <p className="text-meta text-text-muted">{product.descriptor}</p>
        <p className="text-price text-text-primary text-xl">
          {formatPrice(displayPrice, product.currency)}
        </p>
      </div>

      <p className="text-body text-text-secondary max-w-prose">{product.description}</p>

      <VariantSelector
        variants={product.variants}
        selectedSku={selectedSku}
        onSelect={setSelectedSku}
      />

      {selectedVariant?.fulfillmentType === "made-to-order" && selectedVariant.leadTimeDays && (
        <p className="text-meta text-text-muted">
          Made to order — estimated {selectedVariant.leadTimeDays}-day lead time.
        </p>
      )}

      <AddToCartForm product={product} selectedVariant={selectedVariant} />
    </div>
  );
}
