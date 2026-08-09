import { describe, expect, it } from "vitest";
import { toProductSummary } from "./product";

describe("toProductSummary", () => {
  it("maps a lean product document to a ProductSummary", () => {
    const doc = {
      slug: "elara-chaise",
      name: "The Elara Chaise",
      descriptor: "Sculptural Comfort",
      basePrice: 1250000,
      currency: "USD",
    };

    expect(toProductSummary(doc)).toEqual({
      slug: "elara-chaise",
      name: "The Elara Chaise",
      descriptor: "Sculptural Comfort",
      price: 1250000,
      currency: "USD",
    });
  });

  it("omits currency when not present on the document", () => {
    const doc = {
      slug: "orion-credenza",
      name: "The Orion Credenza",
      descriptor: "Hand-Carved Texture",
      basePrice: 1890000,
    };

    expect(toProductSummary(doc).currency).toBeUndefined();
  });
});
