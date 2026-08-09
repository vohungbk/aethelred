import type { Metadata } from "next";
import { ProductCard } from "@/components/features/product/ProductCard";
import { SearchForm } from "@/components/features/search/SearchForm";
import { Container } from "@/components/ui/Container";
import { getProducts } from "@/lib/queries/products";

export const metadata: Metadata = {
  title: "Search — Aethelred",
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const products = query ? await getProducts({ query }) : [];

  return (
    <Container className="flex flex-col gap-10 py-16 sm:py-24">
      <div className="flex flex-col gap-6">
        <h1 className="text-display-h1 text-text-primary">Search</h1>
        <SearchForm defaultValue={query} />
      </div>

      {query && (
        <p className="text-meta text-text-muted">
          {products.length} result{products.length === 1 ? "" : "s"} for &ldquo;{query}&rdquo;
        </p>
      )}

      {query && products.length === 0 ? (
        <p className="text-body text-text-muted">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </Container>
  );
}
