import { useUser } from '@clerk/nextjs';

export default function AccountPage() {
  const { user } = useUser();
  // Use the generic portal if customerPortal is missing
  const portalUrl = String(user?.publicMetadata?.customerPortal || 'https://tempely.lemonsqueezy.com/billing/');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#18181B] to-[#0F0F0F] font-sans px-4 py-20">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 p-8 text-left">
        <h2 className="text-2xl font-bold mb-4 text-white">Account</h2>
        <div className="mb-4 text-white/80">
          <div>Email: <span className="font-mono">{String(user?.primaryEmailAddress?.emailAddress || '')}</span></div>
          {Boolean(user?.publicMetadata?.pro) && (
            <div className="mt-2 text-green-400 font-semibold">Pro Access Active</div>
          )}
        </div>
        {Boolean(user?.publicMetadata?.pro) && portalUrl && (
          <a
            href={portalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm text-blue-300 underline opacity-70 hover:opacity-100 transition"
          >
            Manage Subscription
          </a>
        )}
      </div>
    </div>
  );
} 