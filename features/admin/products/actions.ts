"use server";

import mongoose from "mongoose";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth-guard";
import { dbConnect } from "@/lib/db/connect";
import { Product } from "@/lib/models/Product";
import { Variant } from "@/lib/models/Variant";

export interface AdminFormState {
  status: "idle" | "error";
  message?: string;
}

function parseImages(raw: string) {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [url, alt] = line.split("|").map((part) => part?.trim());
      return { url: url ?? "", alt: alt ?? "" };
    })
    .filter((image) => image.url);
}

function parseTags(raw: string) {
  return raw
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function dollarsToCents(raw: string) {
  const value = Number(raw);
  return Number.isFinite(value) ? Math.round(value * 100) : 0;
}

function readProductFields(formData: FormData) {
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    descriptor: String(formData.get("descriptor") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    collectionId: String(formData.get("collectionId") ?? ""),
    category: String(formData.get("category") ?? ""),
    basePrice: dollarsToCents(String(formData.get("basePrice") ?? "0")),
    images: parseImages(String(formData.get("images") ?? "")),
    isCustomizable: formData.get("isCustomizable") === "on",
    status: String(formData.get("status") ?? "draft"),
    featured: formData.get("featured") === "on",
    featuredOrder: Number(formData.get("featuredOrder") ?? 0) || 0,
    tags: parseTags(String(formData.get("tags") ?? "")),
    seoTitle: String(formData.get("seoTitle") ?? "").trim(),
    seoDescription: String(formData.get("seoDescription") ?? "").trim(),
  };
}

export async function createProduct(
  _prevState: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  await requireAdmin();
  const fields = readProductFields(formData);

  if (!fields.slug || !fields.name || !fields.collectionId || !fields.category) {
    return { status: "error", message: "Slug, name, collection, and category are required." };
  }

  await dbConnect();
  const existing = await Product.findOne({ slug: fields.slug }).lean();
  if (existing) {
    return { status: "error", message: "A product with this slug already exists." };
  }

  const product = await Product.create({
    slug: fields.slug,
    name: fields.name,
    descriptor: fields.descriptor,
    description: fields.description,
    collectionId: fields.collectionId,
    category: fields.category,
    basePrice: fields.basePrice,
    images: fields.images,
    isCustomizable: fields.isCustomizable,
    status: fields.status,
    featured: fields.featured,
    featuredOrder: fields.featuredOrder,
    tags: fields.tags,
    seo: { title: fields.seoTitle || undefined, description: fields.seoDescription || undefined },
  });

  revalidatePath("/admin/products");
  redirect(`/admin/products/${product._id.toString()}`);
}

export async function updateProduct(
  productId: string,
  _prevState: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  await requireAdmin();
  if (!mongoose.isValidObjectId(productId)) {
    return { status: "error", message: "Invalid product." };
  }

  const fields = readProductFields(formData);
  if (!fields.slug || !fields.name || !fields.collectionId || !fields.category) {
    return { status: "error", message: "Slug, name, collection, and category are required." };
  }

  await dbConnect();
  const duplicate = await Product.findOne({ slug: fields.slug, _id: { $ne: productId } }).lean();
  if (duplicate) {
    return { status: "error", message: "A product with this slug already exists." };
  }

  await Product.findByIdAndUpdate(productId, {
    slug: fields.slug,
    name: fields.name,
    descriptor: fields.descriptor,
    description: fields.description,
    collectionId: fields.collectionId,
    category: fields.category,
    basePrice: fields.basePrice,
    images: fields.images,
    isCustomizable: fields.isCustomizable,
    status: fields.status,
    featured: fields.featured,
    featuredOrder: fields.featuredOrder,
    tags: fields.tags,
    seo: { title: fields.seoTitle || undefined, description: fields.seoDescription || undefined },
  });

  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${productId}`);
  return { status: "idle", message: "Saved." };
}

export async function addVariant(productId: string, formData: FormData) {
  await requireAdmin();
  if (!mongoose.isValidObjectId(productId)) return;

  const sku = String(formData.get("sku") ?? "").trim();
  if (!sku) return;

  await dbConnect();
  await Variant.create({
    productId,
    sku,
    attributes: {
      fabric: String(formData.get("fabric") ?? "").trim() || undefined,
      finish: String(formData.get("finish") ?? "").trim() || undefined,
      size: String(formData.get("size") ?? "").trim() || undefined,
      legColor: String(formData.get("legColor") ?? "").trim() || undefined,
    },
    priceDelta: dollarsToCents(String(formData.get("priceDelta") ?? "0")),
    fulfillmentType: String(formData.get("fulfillmentType") ?? "made-to-order"),
    inStock: formData.get("inStock") === "on",
    leadTimeDays: formData.get("leadTimeDays") ? Number(formData.get("leadTimeDays")) : undefined,
  });

  revalidatePath(`/admin/products/${productId}`);
}

export async function deleteVariant(variantId: string, productId: string) {
  await requireAdmin();
  await dbConnect();
  await Variant.findByIdAndDelete(variantId);
  revalidatePath(`/admin/products/${productId}`);
}
