import { ArticleCard } from "@/components/features/journal/ArticleCard";
import type { ArticleSummary } from "@/types/article";

export function JournalTeaserGrid({ articles }: { articles: ArticleSummary[] }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-heading-2 text-text-secondary">From the Journal</h2>
      <div className="grid grid-cols-2 gap-4">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}
