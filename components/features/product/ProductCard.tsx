import Link from "next/link";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { formatPrice } from "@/lib/utils/price";
import type { ProductSummary } from "@/types/product";

export function ProductCard({ product }: { product: ProductSummary }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group focus-visible:outline-accent-gold flex flex-col gap-3 focus-visible:outline-2 focus-visible:outline-offset-4"
    >
      <ImagePlaceholder
        aspect="aspect-square"
        label={product.name}
        className="transition-transform duration-200 ease-out group-hover:scale-[1.02]"
      />
      <div className="flex flex-col gap-1">
        <h3 className="text-heading-3 text-text-primary">{product.name}</h3>
        <p className="text-meta text-text-muted">{product.descriptor}</p>
        <p className="text-price text-text-primary">
          {formatPrice(product.price, product.currency)}
        </p>
      </div>
      <span className="text-button border-text-primary text-text-primary group-hover:bg-text-primary group-hover:text-bg inline-flex w-fit items-center justify-center border px-4 py-2 transition-colors duration-200">
        Discover
      </span>
    </Link>
  );
}
