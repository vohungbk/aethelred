import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CatalogFilterBar } from "@/components/features/catalog/CatalogFilterBar";
import { ProductCard } from "@/components/features/product/ProductCard";
import { Container } from "@/components/ui/Container";
import { getCollectionBySlug } from "@/lib/queries/collections";
import { getProducts, PRODUCT_SORTS, type ProductSort } from "@/lib/queries/products";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ category?: string; sort?: string }>;
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);
  if (!collection) return {};
  return {
    title: `${collection.name} — Aethelred`,
    description: collection.description,
  };
}

export default async function CollectionPage({ params, searchParams }: CollectionPageProps) {
  const { slug } = await params;
  const { category, sort } = await searchParams;

  const collection = await getCollectionBySlug(slug);
  if (!collection) notFound();

  const resolvedSort = PRODUCT_SORTS.includes(sort as ProductSort)
    ? (sort as ProductSort)
    : "featured";
  const products = await getProducts({ collectionSlug: slug, category, sort: resolvedSort });

  return (
    <Container className="flex flex-col gap-10 py-16 sm:py-24">
      <div className="flex flex-col gap-4">
        <h1 className="text-display-h1 text-text-primary">{collection.name}</h1>
        <p className="text-body text-text-secondary max-w-2xl">{collection.description}</p>
      </div>

      <CatalogFilterBar />

      {products.length === 0 ? (
        <p className="text-body text-text-muted">No products match these filters yet.</p>
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
