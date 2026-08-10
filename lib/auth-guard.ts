import { auth } from "@/lib/auth";

// proxy.ts already blocks non-admins from reaching /admin routes, but Server Actions
// can be invoked directly regardless of which page rendered the form — always re-check here.
export async function requireAdmin() {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    throw new Error("Forbidden: admin access required");
  }
  return session;
}
