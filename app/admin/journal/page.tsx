import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { listAdminArticles } from "@/lib/queries/admin";

export const metadata: Metadata = {
  title: "Admin · Journal — Aethelred",
};

export default async function AdminJournalPage() {
  const articles = await listAdminArticles();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-display-h1 text-text-primary">Journal</h2>
        <Link href="/admin/journal/new">
          <Button type="button" variant="solid">
            New Article
          </Button>
        </Link>
      </div>

      {articles.length === 0 ? (
        <p className="text-body text-text-secondary">No articles yet.</p>
      ) : (
        <div className="divide-border flex flex-col divide-y">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/admin/journal/${article.id}`}
              className="flex flex-wrap items-center justify-between gap-4 py-4 transition-opacity duration-150 hover:opacity-70"
            >
              <p className="text-heading-3 text-text-primary">{article.title}</p>
              <p className="text-meta text-text-muted capitalize">{article.status}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
