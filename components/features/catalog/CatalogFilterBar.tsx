"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const categoryOptions = [
  { value: "", label: "All Categories" },
  { value: "sofa", label: "Sofas" },
  { value: "armchair", label: "Armchairs" },
  { value: "table", label: "Tables" },
  { value: "lighting", label: "Lighting" },
  { value: "case-goods", label: "Case Goods" },
];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
];

export function CatalogFilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(params.size ? `${pathname}?${params.toString()}` : pathname);
  }

  return (
    <div className="flex flex-wrap items-center gap-6">
      <label className="text-meta text-text-secondary flex items-center gap-2">
        Category
        <select
          defaultValue={searchParams.get("category") ?? ""}
          onChange={(event) => updateParam("category", event.target.value)}
          className="border-border bg-input-bg text-text-primary text-meta border px-3 py-2"
        >
          {categoryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <label className="text-meta text-text-secondary flex items-center gap-2">
        Sort
        <select
          defaultValue={searchParams.get("sort") ?? "featured"}
          onChange={(event) => updateParam("sort", event.target.value)}
          className="border-border bg-input-bg text-text-primary text-meta border px-3 py-2"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
