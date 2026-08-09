import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { auth, signOut } from "@/lib/auth";

export const metadata: Metadata = {
  title: "My Account — Aethelred",
};

export default async function AccountPage() {
  const session = await auth();
  const user = session!.user;

  async function handleSignOut() {
    "use server";
    await signOut({ redirectTo: "/" });
  }

  return (
    <Container className="flex flex-col gap-10 py-16 sm:py-24">
      <h1 className="text-display-h1 text-text-primary">My Account</h1>

      <div className="flex flex-col gap-1">
        <p className="text-heading-3 text-text-primary">{user.name}</p>
        <p className="text-body text-text-secondary">{user.email}</p>
      </div>

      <Link
        href="/account/orders"
        className="text-link hover:text-link-hover underline decoration-1 underline-offset-4"
      >
        View order history
      </Link>

      <form action={handleSignOut}>
        <Button type="submit" variant="outline">
          Sign Out
        </Button>
      </form>
    </Container>
  );
}
