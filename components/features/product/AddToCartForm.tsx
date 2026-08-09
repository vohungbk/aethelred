"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/stores/cartStore";
import type { ProductDetail, ProductVariantOption } from "@/types/product";

interface AddToCartFormProps {
  product: ProductDetail;
  selectedVariant: ProductVariantOption | null;
}

export function AddToCartForm({ product, selectedVariant }: AddToCartFormProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [justAdded, setJustAdded] = useState(false);

  function handleAddToCart() {
    const variantLabel = selectedVariant
      ? Object.values(selectedVariant.attributes).find(Boolean)
      : undefined;

    addItem({
      productSlug: product.slug,
      variantSku: selectedVariant?.sku,
      name: product.name,
      variantLabel,
      unitPrice: product.price + (selectedVariant?.priceDelta ?? 0),
    });

    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 2000);
  }

  const disabled = selectedVariant ? !selectedVariant.inStock : false;

  return (
    <div className="flex flex-col gap-2">
      <Button type="button" variant="solid" onClick={handleAddToCart} disabled={disabled}>
        {disabled ? "Currently Unavailable" : "Add to Bag"}
      </Button>
      <p role="status" aria-live="polite" className="text-meta text-status-success min-h-[1em]">
        {justAdded ? "Added to your bag." : ""}
      </p>
    </div>
  );
}
