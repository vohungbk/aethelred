"use client";

import { useState } from "react";
import { createCheckoutSession } from "@/features/checkout/actions";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SHIPPING_FLAT_RATE_CENTS } from "@/lib/constants/shipping";
import { formatPrice } from "@/lib/utils/price";
import { useCartStore } from "@/stores/cartStore";

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subtotal = items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
  const estimatedTotal = subtotal + SHIPPING_FLAT_RATE_CENTS;

  async function handleCheckout() {
    setPending(true);
    setError(null);

    const result = await createCheckoutSession(
      items.map((item) => ({
        productSlug: item.productSlug,
        variantSku: item.variantSku,
        quantity: item.quantity,
      })),
    );

    if (result.error) {
      setError(result.error);
      setPending(false);
      return;
    }

    if (result.url) {
      window.location.href = result.url;
    }
  }

  if (items.length === 0) {
    return (
      <Container className="flex flex-col items-start gap-4 py-16 sm:py-24">
        <h1 className="text-display-h1 text-text-primary">Checkout</h1>
        <p className="text-body text-text-secondary">Your bag is empty.</p>
      </Container>
    );
  }

  return (
    <Container className="flex flex-col gap-10 py-16 sm:py-24">
      <h1 className="text-display-h1 text-text-primary">Review Your Order</h1>

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
              <p className="text-meta text-text-secondary">Qty {item.quantity}</p>
            </div>
            <p className="text-price text-text-primary">
              {formatPrice(item.unitPrice * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      <div className="border-border flex flex-col items-end gap-2 border-t pt-6">
        <p className="text-body text-text-secondary">Subtotal: {formatPrice(subtotal)}</p>
        <p className="text-body text-text-secondary">
          Shipping: {formatPrice(SHIPPING_FLAT_RATE_CENTS)}
        </p>
        <p className="text-meta text-text-muted">Tax calculated at the next step</p>
        <p className="text-heading-3 text-text-primary">
          Estimated total: {formatPrice(estimatedTotal)}
        </p>
      </div>

      {error && (
        <p role="alert" aria-live="polite" className="text-meta text-status-error">
          {error}
        </p>
      )}

      <div className="flex justify-end">
        <Button type="button" variant="solid" onClick={handleCheckout} disabled={pending}>
          {pending ? "Redirecting…" : "Continue to Payment"}
        </Button>
      </div>
    </Container>
  );
}
