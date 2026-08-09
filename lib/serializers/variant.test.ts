import { describe, expect, it } from "vitest";
import { toProductVariantOption } from "./variant";

describe("toProductVariantOption", () => {
  it("maps a lean variant document to a ProductVariantOption", () => {
    const doc = {
      sku: "elara-chaise-velvet-navy",
      attributes: { fabric: "Velvet — Navy" },
      priceDelta: 0,
      fulfillmentType: "made-to-order" as const,
      inStock: true,
      leadTimeDays: 42,
    };

    expect(toProductVariantOption(doc)).toEqual({
      sku: "elara-chaise-velvet-navy",
      attributes: { fabric: "Velvet — Navy" },
      priceDelta: 0,
      fulfillmentType: "made-to-order",
      inStock: true,
      leadTimeDays: 42,
    });
  });

  it("defaults attributes to an empty object when missing", () => {
    const doc = {
      sku: "cove-side-table-base",
      priceDelta: 0,
      fulfillmentType: "in-stock" as const,
      inStock: true,
    };

    expect(toProductVariantOption(doc).attributes).toEqual({});
  });
});
