import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CollectionForm } from "@/components/features/admin/CollectionForm";
import { updateCollection } from "@/features/admin/collections/actions";
import { getAdminCollectionById } from "@/lib/queries/admin";

interface AdminCollectionPageProps {
  params: Promise<{ collectionId: string }>;
}

export async function generateMetadata({ params }: AdminCollectionPageProps): Promise<Metadata> {
  const { collectionId } = await params;
  const collection = await getAdminCollectionById(collectionId);
  return { title: collection ? `Admin · ${collection.name} — Aethelred` : "Admin · Collection" };
}

export default async function AdminCollectionPage({ params }: AdminCollectionPageProps) {
  const { collectionId } = await params;
  const collection = await getAdminCollectionById(collectionId);
  if (!collection) notFound();

  const boundUpdate = updateCollection.bind(null, collection.id);

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-display-h1 text-text-primary">{collection.name}</h2>
      <CollectionForm
        action={boundUpdate}
        submitLabel="Save Changes"
        initialValues={{
          slug: collection.slug,
          name: collection.name,
          heroImage: collection.heroImage,
          description: collection.description,
          editorialBody: collection.editorialBody,
          sortOrder: collection.sortOrder,
          isVisible: collection.isVisible,
        }}
      />
    </div>
  );
}
