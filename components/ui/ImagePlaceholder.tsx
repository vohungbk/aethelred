interface ImagePlaceholderProps {
  label?: string;
  aspect?: string;
  className?: string;
}

// Stand-in for real photography — fixed aspect ratio avoids CLS once next/image sources are dropped in.
export function ImagePlaceholder({
  label,
  aspect = "aspect-[4/5]",
  className = "",
}: ImagePlaceholderProps) {
  return (
    <div
      className={`bg-surface border-border text-text-muted flex items-center justify-center overflow-hidden border ${aspect} ${className}`}
    >
      {label && <span className="text-meta px-4 text-center">{label}</span>}
    </div>
  );
}
