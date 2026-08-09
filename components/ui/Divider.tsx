export function Divider({ className = "" }: { className?: string }) {
  return <hr aria-hidden="true" className={`bg-accent-gold h-px w-16 border-0 ${className}`} />;
}
