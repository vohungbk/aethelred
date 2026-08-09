import Link from "next/link";
import type { Metadata } from "next";
import { RegisterForm } from "@/components/features/auth/RegisterForm";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Create Account — Aethelred",
};

interface RegisterPageProps {
  searchParams: Promise<{ callbackUrl?: string }>;
}

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const { callbackUrl } = await searchParams;

  return (
    <Container className="flex flex-col items-center py-16 sm:py-24">
      <div className="flex w-full max-w-sm flex-col gap-8">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-display-h1 text-text-primary">Create Account</h1>
          <p className="text-body text-text-secondary">
            Already have an account?{" "}
            <Link
              href={`/login${callbackUrl ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ""}`}
              className="text-link hover:text-link-hover underline decoration-1 underline-offset-4"
            >
              Sign in
            </Link>
          </p>
        </div>
        <RegisterForm callbackUrl={callbackUrl ?? "/account"} />
      </div>
    </Container>
  );
}
