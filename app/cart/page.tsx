"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { formatPrice } from "@/lib/utils/price";
import { useCartStore } from "@/stores/cartStore";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const subtotal = items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);

  if (items.length === 0) {
    return (
      <Container className="flex flex-col items-start gap-4 py-16 sm:py-24">
        <h1 className="text-display-h1 text-text-primary">Your Bag</h1>
        <p className="text-body text-text-secondary">Your bag is empty.</p>
        <Link
          href="/collections"
          className="text-nav text-link hover:text-link-hover underline decoration-1 underline-offset-4"
        >
          Continue browsing
        </Link>
      </Container>
    );
  }

  return (
    <Container className="flex flex-col gap-10 py-16 sm:py-24">
      <h1 className="text-display-h1 text-text-primary">Your Bag</h1>

      <div className="divide-border flex flex-col divide-y">
        {items.map((item) => (
          <div
            key={`${item.productSlug}::${item.variantSku ?? ""}`}
            className="flex flex-wrap items-center justify-between gap-4 py-6"
          >
            <div className="flex flex-col gap-1">
              <p className="text-heading-3 text-text-primary">{item.name}</p>
              {item.variantLabel && (
                <p className="text-meta text-text-muted">{item.variantLabel}</p>
              )}
              <p className="text-price text-text-primary">{formatPrice(item.unitPrice)}</p>
            </div>
            <div className="flex items-center gap-4">
              <label className="text-meta text-text-secondary flex items-center gap-2">
                Qty
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(event) =>
                    updateQuantity(item.productSlug, item.variantSku, Number(event.target.value))
                  }
                  className="border-border bg-input-bg text-text-primary w-16 border px-2 py-1"
                />
              </label>
              <button
                type="button"
                onClick={() => removeItem(item.productSlug, item.variantSku)}
                className="text-meta text-link hover:text-link-hover underline decoration-1 underline-offset-4"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-border flex flex-col items-end gap-4 border-t pt-6">
        <p className="text-heading-3 text-text-primary">Subtotal: {formatPrice(subtotal)}</p>
        <Link href="/checkout">
          <Button type="button" variant="solid">
            Checkout
          </Button>
        </Link>
      </div>
    </Container>
  );
}
