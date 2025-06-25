import type { AppProps } from 'next/app';
import { ClerkProvider } from '@clerk/nextjs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/styles/globals.css';
console.log('Clerk Frontend API:', process.env.NEXT_PUBLIC_CLERK_FRONTEND_API);

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider frontendApi={process.env.NEXT_PUBLIC_CLERK_FRONTEND_API}>
      <div className="min-h-screen bg-white text-black flex flex-col">
        <Header />
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </ClerkProvider>
  );
}
