import type { Metadata } from "next";
import { ArticleForm } from "@/components/features/admin/ArticleForm";
import { createArticle } from "@/features/admin/articles/actions";

export const metadata: Metadata = {
  title: "Admin · New Article — Aethelred",
};

export default function NewArticlePage() {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-display-h1 text-text-primary">New Article</h2>
      <ArticleForm action={createArticle} submitLabel="Create Article" />
    </div>
  );
}
