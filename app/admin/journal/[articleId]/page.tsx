import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArticleForm } from "@/components/features/admin/ArticleForm";
import { updateArticle } from "@/features/admin/articles/actions";
import { getAdminArticleById } from "@/lib/queries/admin";

interface AdminArticlePageProps {
  params: Promise<{ articleId: string }>;
}

export async function generateMetadata({ params }: AdminArticlePageProps): Promise<Metadata> {
  const { articleId } = await params;
  const article = await getAdminArticleById(articleId);
  return { title: article ? `Admin · ${article.title} — Aethelred` : "Admin · Article" };
}

export default async function AdminArticlePage({ params }: AdminArticlePageProps) {
  const { articleId } = await params;
  const article = await getAdminArticleById(articleId);
  if (!article) notFound();

  const boundUpdate = updateArticle.bind(null, article.id);

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-display-h1 text-text-primary">{article.title}</h2>
      <ArticleForm
        action={boundUpdate}
        submitLabel="Save Changes"
        initialValues={{
          slug: article.slug,
          title: article.title,
          excerpt: article.excerpt,
          coverImageUrl: article.coverImageUrl,
          coverImageAlt: article.coverImageAlt,
          body: article.body,
          authorName: article.authorName,
          status: article.status,
        }}
      />
    </div>
  );
}
