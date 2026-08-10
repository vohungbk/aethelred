"use server";

import mongoose from "mongoose";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth-guard";
import { dbConnect } from "@/lib/db/connect";
import { Collection } from "@/lib/models/Collection";

export interface AdminFormState {
  status: "idle" | "error";
  message?: string;
}

function readCollectionFields(formData: FormData) {
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    heroImage: String(formData.get("heroImage") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    editorialBody: String(formData.get("editorialBody") ?? "").trim(),
    sortOrder: Number(formData.get("sortOrder") ?? 0) || 0,
    isVisible: formData.get("isVisible") === "on",
  };
}

export async function createCollection(
  _prevState: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  await requireAdmin();
  const fields = readCollectionFields(formData);

  if (!fields.slug || !fields.name || !fields.description) {
    return { status: "error", message: "Slug, name, and description are required." };
  }

  await dbConnect();
  const existing = await Collection.findOne({ slug: fields.slug }).lean();
  if (existing) {
    return { status: "error", message: "A collection with this slug already exists." };
  }

  const collection = await Collection.create({
    slug: fields.slug,
    name: fields.name,
    heroImage: fields.heroImage || undefined,
    description: fields.description,
    editorialBody: fields.editorialBody || undefined,
    sortOrder: fields.sortOrder,
    isVisible: fields.isVisible,
  });

  revalidatePath("/admin/collections");
  redirect(`/admin/collections/${collection._id.toString()}`);
}

export async function updateCollection(
  collectionId: string,
  _prevState: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  await requireAdmin();
  if (!mongoose.isValidObjectId(collectionId)) {
    return { status: "error", message: "Invalid collection." };
  }

  const fields = readCollectionFields(formData);
  if (!fields.slug || !fields.name || !fields.description) {
    return { status: "error", message: "Slug, name, and description are required." };
  }

  await dbConnect();
  const duplicate = await Collection.findOne({
    slug: fields.slug,
    _id: { $ne: collectionId },
  }).lean();
  if (duplicate) {
    return { status: "error", message: "A collection with this slug already exists." };
  }

  await Collection.findByIdAndUpdate(collectionId, {
    slug: fields.slug,
    name: fields.name,
    heroImage: fields.heroImage || undefined,
    description: fields.description,
    editorialBody: fields.editorialBody || undefined,
    sortOrder: fields.sortOrder,
    isVisible: fields.isVisible,
  });

  revalidatePath("/admin/collections");
  revalidatePath(`/admin/collections/${collectionId}`);
  return { status: "idle", message: "Saved." };
}
