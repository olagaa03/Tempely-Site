// pages/_app.tsx
import type { AppProps } from 'next/app';
import Header from '@/components/Header';
import Footer from '@/components/Footer'; // Make sure this file exists
import '@/styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}
