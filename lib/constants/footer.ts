import { InstagramIcon, LinkedInIcon, PinterestIcon } from "@/components/ui/icons";

export const footerColumns = [
  {
    heading: "Collections",
    links: [
      { label: "All Collections", href: "/collections" },
      { label: "New Arrivals", href: "/collections?sort=new" },
      { label: "Bestsellers", href: "/collections?sort=bestsellers" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Delivery", href: "/delivery" },
      { label: "Design Consultation", href: "/design-consultation" },
      { label: "Custom Upholstery", href: "/the-atelier" },
    ],
  },
  {
    heading: "Journal",
    links: [
      { label: "All Articles", href: "/journal" },
      { label: "About Us", href: "/our-story" },
    ],
  },
  {
    heading: "Contact",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "FAQ", href: "/faq" },
    ],
  },
];

export const socialLinks = [
  { label: "Instagram", href: "https://instagram.com", Icon: InstagramIcon },
  { label: "Pinterest", href: "https://pinterest.com", Icon: PinterestIcon },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: LinkedInIcon },
];
