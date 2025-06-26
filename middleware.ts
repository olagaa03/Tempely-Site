import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/sign-in",
    "/sign-up",
    "/about",
    "/products",
    "/bundle",
    "/ai-tool", // ✅ Free AI Tool now uses modal
    "/ai-pro",  // ✅ Pro info page also uses modal
  ],
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
