import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in',
  '/sign-up',
  '/about',
  '/products',
  '/products/:slug*',
  '/ai-tool',
  '/ai-pro',
  '/bundle',
  '/api/lemon-webhook',
]);

export default clerkMiddleware(async (auth, req) => {
  // No need to call `.protect()` manually
  if (isPublicRoute(req)) return;
  await auth.protect();
});

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
