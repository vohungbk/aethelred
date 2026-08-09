import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { dbConnect } from "@/lib/db/connect";
import { User } from "@/lib/models/User";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = String(credentials?.email ?? "")
          .toLowerCase()
          .trim();
        const password = String(credentials?.password ?? "");
        if (!email || !password) return null;

        await dbConnect();
        const user = await User.findOne({ email });
        if (!user?.passwordHash) return null;

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return null;

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (!user) return token;

      if (account?.provider === "credentials") {
        token.id = user.id;
        token.role = (user as { role?: "customer" | "admin" }).role ?? "customer";
        return token;
      }

      // OAuth provider (Google): find-or-create our own User doc by email so
      // role/addresses/order history all key off the same collection regardless
      // of how the person signed in.
      await dbConnect();
      const email = user.email?.toLowerCase();
      if (!email) return token;

      let dbUser = await User.findOne({ email });
      if (!dbUser) {
        dbUser = await User.create({
          email,
          name: user.name ?? email,
          image: user.image,
          authProviders: account?.provider ? [account.provider] : [],
        });
      } else if (account?.provider && !dbUser.authProviders?.includes(account.provider)) {
        dbUser.authProviders = [...(dbUser.authProviders ?? []), account.provider];
        await dbUser.save();
      }

      token.id = dbUser._id.toString();
      token.role = dbUser.role as "customer" | "admin";
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id;
        session.user.role = token.role ?? "customer";
      }
      return session;
    },
  },
});
