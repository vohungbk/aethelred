import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

export function BrandStoryBlock() {
  return (
    <section className="py-16 sm:py-24">
      <Container className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
        <ImagePlaceholder aspect="aspect-[4/3] lg:aspect-square" label="Material detail" />
        <div className="flex flex-col gap-6">
          <Divider />
          <p className="text-body text-text-secondary max-w-lg">
            Aethelred is a dedicated atelier where the timeless methods of bespoke craftsmanship
            converge with contemporary design. We curate and create pieces that do more than occupy
            space; they define it.
          </p>
        </div>
      </Container>
    </section>
  );
}
