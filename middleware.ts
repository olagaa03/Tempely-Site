import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/about",
    "/products",
    "/products/(.*)",
    "/bundle",
    "/sign-in",
    "/sign-up",
  ],
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
