import mongoose from "mongoose";
import { dbConnect } from "@/lib/db/connect";
import { Article } from "@/lib/models/Article";
import { Collection } from "@/lib/models/Collection";
import { Order } from "@/lib/models/Order";
import { Product } from "@/lib/models/Product";
import { User } from "@/lib/models/User";
import { Variant } from "@/lib/models/Variant";
import type { OrderLean } from "@/types/order";
import type { ProductVariantOption } from "@/types/product";

// --- Products ---------------------------------------------------------

export interface AdminProductListItem {
  id: string;
  slug: string;
  name: string;
  basePrice: number;
  status: "draft" | "published" | "archived";
  collectionName: string;
}

export async function listAdminProducts(): Promise<AdminProductListItem[]> {
  await dbConnect();
  const [productDocs, collectionDocs] = await Promise.all([
    Product.find({}).sort({ createdAt: -1 }).lean(),
    Collection.find({}).lean(),
  ]);
  const collectionNameById = new Map(collectionDocs.map((doc) => [String(doc._id), doc.name]));

  return productDocs.map((doc) => ({
    id: String(doc._id),
    slug: doc.slug,
    name: doc.name,
    basePrice: doc.basePrice,
    status: doc.status as AdminProductListItem["status"],
    collectionName: collectionNameById.get(String(doc.collectionId)) ?? "—",
  }));
}

export interface AdminProductDetail {
  id: string;
  slug: string;
  name: string;
  descriptor: string;
  description: string;
  collectionId: string;
  category: string;
  basePrice: number;
  currency: string;
  images: { url: string; alt: string }[];
  isCustomizable: boolean;
  status: "draft" | "published" | "archived";
  featured: boolean;
  featuredOrder: number;
  tags: string[];
  seo: { title?: string; description?: string };
}

export interface AdminVariant extends ProductVariantOption {
  id: string;
}

export async function getAdminProductById(
  id: string,
): Promise<{ product: AdminProductDetail; variants: AdminVariant[] } | null> {
  if (!mongoose.isValidObjectId(id)) return null;

  await dbConnect();
  const doc = await Product.findById(id).lean();
  if (!doc) return null;

  const variantDocs = await Variant.find({ productId: doc._id }).sort({ createdAt: 1 }).lean();

  return {
    product: {
      id: String(doc._id),
      slug: doc.slug,
      name: doc.name,
      descriptor: doc.descriptor,
      description: doc.description,
      collectionId: String(doc.collectionId),
      category: doc.category,
      basePrice: doc.basePrice,
      currency: doc.currency ?? "USD",
      images: doc.images ?? [],
      isCustomizable: doc.isCustomizable ?? false,
      status: doc.status as AdminProductDetail["status"],
      featured: doc.featured ?? false,
      featuredOrder: doc.featuredOrder ?? 0,
      tags: doc.tags ?? [],
      seo: doc.seo ?? {},
    },
    variants: variantDocs.map((v) => ({
      id: String(v._id),
      sku: v.sku,
      attributes: v.attributes ?? {},
      priceDelta: v.priceDelta,
      fulfillmentType: v.fulfillmentType as ProductVariantOption["fulfillmentType"],
      inStock: v.inStock,
      leadTimeDays: v.leadTimeDays,
    })),
  };
}

// --- Collections --------------------------------------------------------

export interface AdminCollectionOption {
  id: string;
  name: string;
}

export async function listAdminCollectionOptions(): Promise<AdminCollectionOption[]> {
  await dbConnect();
  const docs = await Collection.find({}).sort({ sortOrder: 1 }).lean();
  return docs.map((doc) => ({ id: String(doc._id), name: doc.name }));
}

export interface AdminCollectionListItem extends AdminCollectionOption {
  slug: string;
  isVisible: boolean;
}

export async function listAdminCollections(): Promise<AdminCollectionListItem[]> {
  await dbConnect();
  const docs = await Collection.find({}).sort({ sortOrder: 1 }).lean();
  return docs.map((doc) => ({
    id: String(doc._id),
    slug: doc.slug,
    name: doc.name,
    isVisible: doc.isVisible,
  }));
}

export interface AdminCollectionDetail {
  id: string;
  slug: string;
  name: string;
  heroImage?: string;
  description: string;
  editorialBody?: string;
  sortOrder: number;
  isVisible: boolean;
}

export async function getAdminCollectionById(id: string): Promise<AdminCollectionDetail | null> {
  if (!mongoose.isValidObjectId(id)) return null;

  await dbConnect();
  const doc = await Collection.findById(id).lean();
  if (!doc) return null;

  return {
    id: String(doc._id),
    slug: doc.slug,
    name: doc.name,
    heroImage: doc.heroImage,
    description: doc.description,
    editorialBody: doc.editorialBody,
    sortOrder: doc.sortOrder ?? 0,
    isVisible: doc.isVisible ?? true,
  };
}

// --- Orders ---------------------------------------------------------------

export interface AdminOrderListItem {
  orderNumber: string;
  status: string;
  paymentStatus: string;
  total: number;
  customerEmail: string;
  createdAt: string;
}

export async function listAdminOrders(): Promise<AdminOrderListItem[]> {
  await dbConnect();
  const [orderDocs, userDocs] = await Promise.all([
    Order.find({}).sort({ createdAt: -1 }).lean(),
    User.find({}).lean(),
  ]);
  const emailByUserId = new Map(userDocs.map((doc) => [String(doc._id), doc.email]));

  return orderDocs.map((doc) => ({
    orderNumber: doc.orderNumber,
    status: doc.status,
    paymentStatus: doc.paymentStatus,
    total: doc.total,
    customerEmail: emailByUserId.get(String(doc.userId)) ?? "—",
    createdAt: doc.createdAt?.toISOString() ?? "",
  }));
}

export async function getAdminOrderByNumber(orderNumber: string): Promise<OrderLean | null> {
  await dbConnect();
  const order = (await Order.findOne({ orderNumber }).lean()) as OrderLean | null;
  return order;
}

// --- Articles ---------------------------------------------------------------

export interface AdminArticleListItem {
  id: string;
  slug: string;
  title: string;
  status: "draft" | "published" | "archived";
}

export async function listAdminArticles(): Promise<AdminArticleListItem[]> {
  await dbConnect();
  const docs = await Article.find({}).sort({ createdAt: -1 }).lean();
  return docs.map((doc) => ({
    id: String(doc._id),
    slug: doc.slug,
    title: doc.title,
    status: doc.status as AdminArticleListItem["status"],
  }));
}

export interface AdminArticleDetail {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImageUrl?: string;
  coverImageAlt?: string;
  body: string;
  authorName: string;
  status: "draft" | "published" | "archived";
}

export async function getAdminArticleById(id: string): Promise<AdminArticleDetail | null> {
  if (!mongoose.isValidObjectId(id)) return null;

  await dbConnect();
  const doc = await Article.findById(id).lean();
  if (!doc) return null;

  return {
    id: String(doc._id),
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    coverImageUrl: doc.coverImage?.url,
    coverImageAlt: doc.coverImage?.alt,
    body: doc.body,
    authorName: doc.author?.name ?? "",
    status: doc.status as AdminArticleDetail["status"],
  };
}
