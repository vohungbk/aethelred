import { auth } from "@/lib/auth";

export default auth((req) => {
  const { pathname, search } = req.nextUrl;
  const isLoggedIn = Boolean(req.auth);

  if (!isLoggedIn) {
    const loginUrl = new URL("/login", req.nextUrl);
    loginUrl.searchParams.set("callbackUrl", pathname + search);
    return Response.redirect(loginUrl);
  }

  if (pathname.startsWith("/admin") && req.auth?.user?.role !== "admin") {
    return Response.redirect(new URL("/", req.nextUrl));
  }
});

export const config = {
  matcher: ["/account/:path*", "/checkout/:path*", "/admin/:path*"],
};
