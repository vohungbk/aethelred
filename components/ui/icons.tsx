import type { SVGProps } from "react";

function IconBase(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    />
  );
}

export function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <circle cx="10" cy="10" r="6.5" />
      <path d="m20 20-5.2-5.2" />
    </IconBase>
  );
}

export function UserIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c1.4-4.2 4-6.2 7.5-6.2s6.1 2 7.5 6.2" />
    </IconBase>
  );
}

export function BagIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M6.5 8h11l-1 12h-9l-1-12Z" />
      <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
    </IconBase>
  );
}

export function ChevronDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase viewBox="0 0 12 8" {...props}>
      <path d="M1 1.5 6 6.5 11 1.5" />
    </IconBase>
  );
}

export function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </IconBase>
  );
}

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </IconBase>
  );
}

export function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M4 12h16M13 5l7 7-7 7" />
    </IconBase>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.6" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

export function PinterestIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9.7 17.2c.5-1.8 1.1-4.3 1.1-4.3m0 0c-.3-.9.1-2.3 1.4-2.3 1 0 1.7.8 1.7 1.8 0 1.1-.7 2.7-2 2.7-.6 0-1.1-.5-.9-1.2" />
    </IconBase>
  );
}

export function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
      <circle cx="8" cy="8.3" r="0.6" fill="currentColor" stroke="none" />
      <path d="M8 11v6M12 11v6M12 13.5c0-1.4 1-2.5 2.3-2.5S16.5 12.1 16.5 13.5V17" />
    </IconBase>
  );
}
