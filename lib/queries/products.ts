import { dbConnect } from "@/lib/db/connect";
import { Collection } from "@/lib/models/Collection";
import { Product } from "@/lib/models/Product";
import { toProductSummary } from "@/lib/serializers/product";
import type { ProductSummary } from "@/types/product";

export type ProductSort = "featured" | "price-asc" | "price-desc" | "newest";

export const PRODUCT_SORTS: ProductSort[] = ["featured", "price-asc", "price-desc", "newest"];

const SORT_MAP: Record<ProductSort, Record<string, 1 | -1>> = {
  featured: { featuredOrder: 1, createdAt: -1 },
  "price-asc": { basePrice: 1 },
  "price-desc": { basePrice: -1 },
  newest: { createdAt: -1 },
};

interface GetProductsParams {
  collectionSlug?: string;
  category?: string;
  sort?: ProductSort;
  query?: string;
}

export async function getProducts({
  collectionSlug,
  category,
  sort = "featured",
  query,
}: GetProductsParams): Promise<ProductSummary[]> {
  await dbConnect();

  const filter: Record<string, unknown> = { status: "published" };

  if (collectionSlug) {
    const collection = await Collection.findOne({ slug: collectionSlug }).lean();
    if (!collection) return [];
    filter.collectionId = collection._id;
  }

  if (category) filter.category = category;
  if (query) filter.$text = { $search: query };

  const docs = await Product.find(filter).sort(SORT_MAP[sort]).lean();
  return docs.map(toProductSummary);
}

export async function getFeaturedProducts(limit = 3): Promise<ProductSummary[]> {
  await dbConnect();
  const docs = await Product.find({ status: "published", featured: true })
    .sort({ featuredOrder: 1 })
    .limit(limit)
    .lean();
  return docs.map(toProductSummary);
}
