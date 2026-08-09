import type { DefaultSession } from "next-auth";

declare module "@auth/core/types" {
  interface Session {
    user: {
      id: string;
      role: "customer" | "admin";
    } & DefaultSession["user"];
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id?: string;
    role?: "customer" | "admin";
  }
}
