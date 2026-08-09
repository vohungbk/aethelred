import { describe, expect, it } from "vitest";
import { generateOrderNumber } from "./orderNumber";

describe("generateOrderNumber", () => {
  it("formats as AE-YYYYMMDD-XXXX", () => {
    const date = new Date("2026-08-09T12:00:00.000Z");
    expect(generateOrderNumber(date, 0)).toBe("AE-20260809-0000");
  });

  it("encodes the random component as a 4-character uppercase base36 suffix", () => {
    const date = new Date("2026-08-09T12:00:00.000Z");
    expect(generateOrderNumber(date, 0.5)).toMatch(/^AE-20260809-[0-9A-Z]{4}$/);
  });

  it("produces different order numbers for different random inputs", () => {
    const date = new Date("2026-08-09T12:00:00.000Z");
    expect(generateOrderNumber(date, 0.1)).not.toBe(generateOrderNumber(date, 0.9));
  });
});
