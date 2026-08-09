import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductGallery } from "@/components/features/product/ProductGallery";
import { ProductPurchasePanel } from "@/components/features/product/ProductPurchasePanel";
import { Container } from "@/components/ui/Container";
import { getProductBySlug } from "@/lib/queries/products";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — Aethelred`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <Container className="grid grid-cols-1 gap-10 py-16 sm:py-24 lg:grid-cols-2 lg:gap-16">
      <ProductGallery productName={product.name} />
      <ProductPurchasePanel product={product} />
    </Container>
  );
}
