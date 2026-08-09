import Link from "next/link";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import type { ArticleSummary } from "@/types/article";

export function ArticleCard({ article }: { article: ArticleSummary }) {
  return (
    <Link
      href={`/journal/${article.slug}`}
      className="group focus-visible:outline-accent-gold flex flex-col gap-2 focus-visible:outline-2 focus-visible:outline-offset-4"
    >
      <ImagePlaceholder
        aspect="aspect-[4/3]"
        label={article.title}
        className="transition-transform duration-200 ease-out group-hover:scale-[1.02]"
      />
      <h3 className="text-heading-3 text-text-primary text-sm">{article.title}</h3>
    </Link>
  );
}
