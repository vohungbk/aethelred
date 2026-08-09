import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { getVisibleCollections } from "@/lib/queries/collections";

export const metadata: Metadata = {
  title: "Collections — Aethelred",
  description: "Browse the Aethelred collections of bespoke furniture and lighting.",
};

export const dynamic = "force-dynamic";

export default async function CollectionsPage() {
  const collections = await getVisibleCollections();

  return (
    <Container className="flex flex-col gap-10 py-16 sm:py-24">
      <h1 className="text-display-h1 text-text-primary">Collections</h1>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((collection) => (
          <Link
            key={collection.slug}
            href={`/collections/${collection.slug}`}
            className="group focus-visible:outline-accent-gold flex flex-col gap-3 focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <ImagePlaceholder
              aspect="aspect-[4/3]"
              label={collection.name}
              className="transition-transform duration-200 ease-out group-hover:scale-[1.02]"
            />
            <h2 className="text-heading-3 text-text-primary">{collection.name}</h2>
          </Link>
        ))}
      </div>
    </Container>
  );
}
