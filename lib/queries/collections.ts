import { dbConnect } from "@/lib/db/connect";
import { Collection } from "@/lib/models/Collection";
import type { CollectionDetail, CollectionSummary } from "@/types/collection";

export async function getVisibleCollections(): Promise<CollectionSummary[]> {
  await dbConnect();
  const docs = await Collection.find({ isVisible: true }).sort({ sortOrder: 1 }).lean();
  return docs.map((doc) => ({ slug: doc.slug, name: doc.name }));
}

export async function getCollectionBySlug(slug: string): Promise<CollectionDetail | null> {
  await dbConnect();
  const doc = await Collection.findOne({ slug, isVisible: true }).lean();
  if (!doc) return null;
  return { slug: doc.slug, name: doc.name, description: doc.description };
}
