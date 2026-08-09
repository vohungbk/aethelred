import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

export function DesignPhilosophyBlock() {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
      <ImagePlaceholder
        aspect="aspect-square"
        label="Craftsman at work"
        className="w-full sm:w-64"
      />
      <div className="flex flex-1 flex-col gap-3 sm:max-w-xl">
        <h2 className="text-heading-2 text-text-secondary">The Design Philosophy</h2>
        <p className="text-heading-3 text-text-primary">Where Craftsmanship Meets Vision.</p>
        <p className="text-body text-text-secondary">
          Aethelred is a dedicated atelier where the timeless methods of bespoke craftsmanship
          converge with contemporary design. We curate and create pieces that do more than occupy
          space; they define it.
        </p>
      </div>
    </div>
  );
}
