import Link from "next/link";
import { NewsletterForm } from "@/components/features/newsletter/NewsletterForm";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";
import { footerColumns, socialLinks } from "@/lib/constants/footer";

export function Footer() {
  return (
    <footer className="bg-surface border-border mt-24 border-t">
      <Container className="flex flex-col gap-12 py-16">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {footerColumns.map((column) => (
            <div key={column.heading} className="flex flex-col gap-4">
              <h2 className="text-heading-2 text-text-secondary">{column.heading}</h2>
              <ul className="flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-body text-link hover:text-link-hover transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Divider />

        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex gap-5">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-text-secondary hover:text-link-hover transition-colors duration-150"
              >
                <social.Icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:max-w-xs">
            <h2 className="text-heading-2 text-text-secondary">Join the Aethelred Insights</h2>
            <NewsletterForm />
          </div>
        </div>
      </Container>
    </footer>
  );
}
