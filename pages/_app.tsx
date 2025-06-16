// pages/_app.tsx
import type { AppProps } from 'next/app';
import Header from '@/components/Header';
import '@/styles/globals.css'; // if you use a global stylesheet

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
