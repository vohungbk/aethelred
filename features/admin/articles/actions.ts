"use server";

import mongoose from "mongoose";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth-guard";
import { dbConnect } from "@/lib/db/connect";
import { Article } from "@/lib/models/Article";

export interface AdminFormState {
  status: "idle" | "error";
  message?: string;
}

function readArticleFields(formData: FormData) {
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    coverImageUrl: String(formData.get("coverImageUrl") ?? "").trim(),
    coverImageAlt: String(formData.get("coverImageAlt") ?? "").trim(),
    body: String(formData.get("body") ?? "").trim(),
    authorName: String(formData.get("authorName") ?? "").trim(),
    status: String(formData.get("status") ?? "draft"),
  };
}

export async function createArticle(
  _prevState: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  await requireAdmin();
  const fields = readArticleFields(formData);

  if (!fields.slug || !fields.title || !fields.excerpt || !fields.body || !fields.authorName) {
    return { status: "error", message: "Slug, title, excerpt, body, and author are required." };
  }

  await dbConnect();
  const existing = await Article.findOne({ slug: fields.slug }).lean();
  if (existing) {
    return { status: "error", message: "An article with this slug already exists." };
  }

  const article = await Article.create({
    slug: fields.slug,
    title: fields.title,
    excerpt: fields.excerpt,
    coverImage: fields.coverImageUrl
      ? { url: fields.coverImageUrl, alt: fields.coverImageAlt }
      : undefined,
    body: fields.body,
    author: { name: fields.authorName },
    status: fields.status,
    publishedAt: fields.status === "published" ? new Date() : undefined,
  });

  revalidatePath("/admin/journal");
  redirect(`/admin/journal/${article._id.toString()}`);
}

export async function updateArticle(
  articleId: string,
  _prevState: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  await requireAdmin();
  if (!mongoose.isValidObjectId(articleId)) {
    return { status: "error", message: "Invalid article." };
  }

  const fields = readArticleFields(formData);
  if (!fields.slug || !fields.title || !fields.excerpt || !fields.body || !fields.authorName) {
    return { status: "error", message: "Slug, title, excerpt, body, and author are required." };
  }

  await dbConnect();
  const duplicate = await Article.findOne({ slug: fields.slug, _id: { $ne: articleId } }).lean();
  if (duplicate) {
    return { status: "error", message: "An article with this slug already exists." };
  }

  const existing = await Article.findById(articleId);
  if (!existing) {
    return { status: "error", message: "Article not found." };
  }

  existing.slug = fields.slug;
  existing.title = fields.title;
  existing.excerpt = fields.excerpt;
  existing.coverImage = fields.coverImageUrl
    ? { url: fields.coverImageUrl, alt: fields.coverImageAlt }
    : undefined;
  existing.body = fields.body;
  existing.author = { name: fields.authorName };
  if (existing.status !== "published" && fields.status === "published") {
    existing.publishedAt = new Date();
  }
  existing.status = fields.status as typeof existing.status;
  await existing.save();

  revalidatePath("/admin/journal");
  revalidatePath(`/admin/journal/${articleId}`);
  return { status: "idle", message: "Saved." };
}
