import { describe, expect, it } from "vitest";
import { formatPrice } from "./price";

describe("formatPrice", () => {
  it("formats cents as a whole-dollar USD amount", () => {
    expect(formatPrice(1250000)).toBe("$12,500");
  });

  it("formats a different currency when provided", () => {
    expect(formatPrice(950000, "EUR")).toBe("€9,500");
  });
});
