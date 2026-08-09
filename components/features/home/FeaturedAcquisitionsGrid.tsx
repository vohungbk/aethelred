import { ProductCard } from "@/components/features/product/ProductCard";
import type { ProductSummary } from "@/types/product";

export function FeaturedAcquisitionsGrid({ products }: { products: ProductSummary[] }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-heading-2 text-text-secondary">Featured Acquisitions</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
