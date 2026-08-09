"use client";

import { useActionState } from "react";
import { loginWithCredentials, signInWithGoogle, type AuthFormState } from "@/features/auth/actions";
import { Button } from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";
import { Input } from "@/components/ui/Input";

const initialState: AuthFormState = { status: "idle" };

export function LoginForm({ callbackUrl }: { callbackUrl: string }) {
  const [state, formAction, pending] = useActionState(loginWithCredentials, initialState);

  return (
    <div className="flex flex-col gap-6">
      <form action={formAction} className="flex flex-col gap-4">
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        <Input label="Email address" name="email" type="email" autoComplete="email" required />
        <Input
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
        <p role="alert" aria-live="polite" className="text-meta min-h-[1em]">
          {state.status === "error" && <span className="text-status-error">{state.message}</span>}
        </p>
        <Button type="submit" variant="solid" disabled={pending}>
          {pending ? "Signing in…" : "Sign In"}
        </Button>
      </form>

      <div className="flex items-center gap-4">
        <Divider className="w-full" />
        <span className="text-meta text-text-muted">or</span>
        <Divider className="w-full" />
      </div>

      <form action={signInWithGoogle}>
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        <Button type="submit" variant="outline" className="w-full">
          Continue with Google
        </Button>
      </form>
    </div>
  );
}
