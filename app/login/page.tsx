import Link from "next/link";
import type { Metadata } from "next";
import { LoginForm } from "@/components/features/auth/LoginForm";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Sign In — Aethelred",
};

interface LoginPageProps {
  searchParams: Promise<{ callbackUrl?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { callbackUrl } = await searchParams;

  return (
    <Container className="flex flex-col items-center py-16 sm:py-24">
      <div className="flex w-full max-w-sm flex-col gap-8">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-display-h1 text-text-primary">Sign In</h1>
          <p className="text-body text-text-secondary">
            New to Aethelred?{" "}
            <Link
              href={`/register${callbackUrl ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ""}`}
              className="text-link hover:text-link-hover underline decoration-1 underline-offset-4"
            >
              Create an account
            </Link>
          </p>
        </div>
        <LoginForm callbackUrl={callbackUrl ?? "/account"} />
      </div>
    </Container>
  );
}
