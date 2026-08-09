import { auth } from "@/lib/auth";

export default auth((req) => {
  if (req.auth) return;

  const loginUrl = new URL("/login", req.nextUrl);
  loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname + req.nextUrl.search);
  return Response.redirect(loginUrl);
});

export const config = {
  matcher: ["/account/:path*", "/checkout/:path*"],
};
