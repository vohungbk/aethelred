import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";
import { Input } from "@/components/ui/Input";
import { ThemeToggle } from "@/components/features/theme/ThemeToggle";

const colorTokens = [
  { name: "bg", var: "--color-bg" },
  { name: "surface", var: "--color-surface" },
  { name: "primary", var: "--color-primary" },
  { name: "accent-gold", var: "--color-accent-gold" },
  { name: "text-primary", var: "--color-text-primary" },
  { name: "text-secondary", var: "--color-text-secondary" },
  { name: "text-muted", var: "--color-text-muted" },
  { name: "text-disabled", var: "--color-text-disabled" },
  { name: "border", var: "--color-border" },
  { name: "status-success", var: "--color-status-success" },
  { name: "status-warning", var: "--color-status-warning" },
  { name: "status-error", var: "--color-status-error" },
  { name: "status-info", var: "--color-status-info" },
];

export default function DesignSystemPage() {
  return (
    <div className="py-16">
      <Container className="flex flex-col gap-16">
        <header className="flex items-center justify-between">
          <h1 className="text-display-h1">Design System</h1>
          <ThemeToggle />
        </header>

        <section className="flex flex-col gap-6">
          <h2 className="text-heading-2 text-text-secondary">Color tokens</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {colorTokens.map((token) => (
              <div key={token.name} className="border-border flex flex-col gap-2 border">
                <div
                  className="border-border h-16 w-full border-b"
                  style={{ backgroundColor: `var(${token.var})` }}
                />
                <p className="text-meta text-text-secondary px-3 pb-3">{token.name}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="text-heading-2 text-text-secondary">Typography</h2>
          <div className="flex flex-col gap-4">
            <p className="text-display">Aethelred</p>
            <h1 className="text-display-h1">Curating elegance. Designing distinction.</h1>
            <h2 className="text-heading-2">Featured Acquisitions</h2>
            <h3 className="text-heading-3">The Elara Chaise</h3>
            <p className="text-body max-w-prose">
              Aethelred is a dedicated atelier where the timeless methods of bespoke craftsmanship
              converge with contemporary design.
            </p>
            <p className="text-meta text-text-muted">Sculptural comfort</p>
            <p className="text-nav">Collections</p>
            <p className="text-price">$12,500</p>
            <p className="text-button">Discover</p>
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="text-heading-2 text-text-secondary">Buttons</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="solid">Add to Bag</Button>
            <Button variant="outline">Discover</Button>
            <Button variant="ghost">View details</Button>
            <Button variant="solid" disabled>
              Sold Out
            </Button>
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="text-heading-2 text-text-secondary">Form</h2>
          <div className="max-w-sm">
            <Input label="Email" type="email" placeholder="Enter your email" />
          </div>
          <div className="max-w-sm">
            <Input
              label="Email"
              type="email"
              defaultValue="not-an-email"
              error="Enter a valid email address"
            />
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="text-heading-2 text-text-secondary">Badge & Divider</h2>
          <div className="flex items-center gap-4">
            <Badge>New Arrival</Badge>
            <Badge>Made to Order</Badge>
          </div>
          <Divider />
        </section>
      </Container>
    </div>
  );
}
