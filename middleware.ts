import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/sign-in", "/sign-up", "/products", "/products/:path*"],
});


export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
