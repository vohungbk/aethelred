"use client";

import type { ProductVariantOption, VariantAttributes } from "@/types/product";

interface VariantSelectorProps {
  variants: ProductVariantOption[];
  selectedSku: string | null;
  onSelect: (sku: string) => void;
}

const AXIS_LABELS: { key: keyof VariantAttributes; label: string }[] = [
  { key: "fabric", label: "Fabric" },
  { key: "finish", label: "Finish" },
  { key: "size", label: "Size" },
  { key: "legColor", label: "Leg Color" },
];

function getAxisLabel(variants: ProductVariantOption[]): string {
  const first = variants[0]?.attributes ?? {};
  return AXIS_LABELS.find((axis) => first[axis.key])?.label ?? "Options";
}

function getVariantLabel(variant: ProductVariantOption): string {
  const axis = AXIS_LABELS.find((entry) => variant.attributes[entry.key]);
  return (axis && variant.attributes[axis.key]) || variant.sku;
}

export function VariantSelector({ variants, selectedSku, onSelect }: VariantSelectorProps) {
  if (variants.length === 0) return null;

  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="text-heading-2 text-text-secondary">{getAxisLabel(variants)}</legend>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => {
          const active = variant.sku === selectedSku;
          return (
            <button
              key={variant.sku}
              type="button"
              aria-pressed={active}
              disabled={!variant.inStock}
              onClick={() => onSelect(variant.sku)}
              className={`text-meta border px-4 py-2 transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50 ${
                active
                  ? "border-text-primary bg-text-primary text-bg"
                  : "border-border text-text-secondary hover:border-text-primary"
              }`}
            >
              {getVariantLabel(variant)}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
