import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useClerk } from '@clerk/nextjs';

export default function SignOutPage() {
  const router = useRouter();
  const { signOut } = useClerk();

  useEffect(() => {
    signOut(() => router.push('/sign-in'));
  }, [signOut, router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-950">
      <div className="text-white text-xl">Signing you out...</div>
    </main>
  );
} 