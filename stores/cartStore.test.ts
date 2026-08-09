import { beforeEach, describe, expect, it } from "vitest";
import { useCartStore } from "./cartStore";

beforeEach(() => {
  useCartStore.setState({ items: [] });
});

describe("cartStore", () => {
  it("adds a new line item", () => {
    useCartStore.getState().addItem({
      productSlug: "elara-chaise",
      variantSku: "elara-chaise-velvet-navy",
      name: "The Elara Chaise",
      variantLabel: "Velvet — Navy",
      unitPrice: 1250000,
    });

    expect(useCartStore.getState().items).toEqual([
      {
        productSlug: "elara-chaise",
        variantSku: "elara-chaise-velvet-navy",
        name: "The Elara Chaise",
        variantLabel: "Velvet — Navy",
        unitPrice: 1250000,
        quantity: 1,
      },
    ]);
  });

  it("increments quantity when the same product+variant is added again", () => {
    const item = {
      productSlug: "elara-chaise",
      variantSku: "elara-chaise-velvet-navy",
      name: "The Elara Chaise",
      unitPrice: 1250000,
    };
    useCartStore.getState().addItem(item);
    useCartStore.getState().addItem(item);

    expect(useCartStore.getState().items).toHaveLength(1);
    expect(useCartStore.getState().items[0].quantity).toBe(2);
  });

  it("keeps different variants of the same product as separate lines", () => {
    useCartStore.getState().addItem({
      productSlug: "elara-chaise",
      variantSku: "elara-chaise-velvet-navy",
      name: "The Elara Chaise",
      unitPrice: 1250000,
    });
    useCartStore.getState().addItem({
      productSlug: "elara-chaise",
      variantSku: "elara-chaise-boucle-cream",
      name: "The Elara Chaise",
      unitPrice: 1295000,
    });

    expect(useCartStore.getState().items).toHaveLength(2);
  });

  it("removes a line item", () => {
    useCartStore.getState().addItem({
      productSlug: "elara-chaise",
      name: "The Elara Chaise",
      unitPrice: 1250000,
    });
    useCartStore.getState().removeItem("elara-chaise", undefined);

    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it("removes a line item when its quantity is updated to zero", () => {
    useCartStore.getState().addItem({
      productSlug: "elara-chaise",
      name: "The Elara Chaise",
      unitPrice: 1250000,
    });
    useCartStore.getState().updateQuantity("elara-chaise", undefined, 0);

    expect(useCartStore.getState().items).toHaveLength(0);
  });
});
