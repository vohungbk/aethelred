import { BrandStoryBlock } from "@/components/features/home/BrandStoryBlock";
import { DesignPhilosophyBlock } from "@/components/features/home/DesignPhilosophyBlock";
import { FeaturedAcquisitionsGrid } from "@/components/features/home/FeaturedAcquisitionsGrid";
import { Hero } from "@/components/features/home/Hero";
import { JournalTeaserGrid } from "@/components/features/home/JournalTeaserGrid";
import { Container } from "@/components/ui/Container";
import { mockJournalArticles } from "@/lib/mock/articles";
import { mockFeaturedProducts } from "@/lib/mock/products";

export default function Home() {
  return (
    <div>
      <Hero
        headline={["Curating Elegance.", "Designing Distinction."]}
        ctaLabel="Explore Our Spring Collection"
        ctaHref="/collections"
      />
      <Container className="flex flex-col gap-20 py-16 sm:py-24">
        <FeaturedAcquisitionsGrid products={mockFeaturedProducts} />
        <DesignPhilosophyBlock />
        <JournalTeaserGrid articles={mockJournalArticles} />
      </Container>
      <BrandStoryBlock />
    </div>
  );
}
