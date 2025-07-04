import { useState } from 'react';
import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/router';

export default function CustomSignUp() {
  const { signUp, isLoaded } = useSignUp();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (!isLoaded) return;
    try {
      await signUp.create({ emailAddress: email, password });
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (!isLoaded) return;
    try {
      const res = await signUp.attemptEmailAddressVerification({ code });
      if (res.status === 'complete') {
        setSuccess('Email verified! You can now sign in.');
        setTimeout(() => router.push('/sign-in'), 1500);
      } else {
        setError('Verification incomplete. Please try again.');
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#18122B] via-[#0F0F1C] to-[#4B2067]">
      <form onSubmit={pendingVerification ? handleVerify : handleSubmit} className="bg-black/60 p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-white mb-2">Sign Up</h2>
        {error && <div className="bg-red-500/20 text-red-300 p-2 rounded mb-2">{error}</div>}
        {success && <div className="bg-green-500/20 text-green-300 p-2 rounded mb-2">{success}</div>}
        {!pendingVerification ? (
          <>
            <div>
              <label className="block text-gray-300 mb-1">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full p-3 rounded bg-black/40 border border-white/20 text-white" />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full p-3 rounded bg-black/40 border border-white/20 text-white" />
            </div>
            <button type="submit" disabled={loading} className="w-full py-3 rounded bg-blue-600 text-white font-bold hover:bg-blue-500 transition">{loading ? 'Signing up...' : 'Sign Up'}</button>
            <div className="text-gray-400 text-sm mt-2">Already have an account? <a href="/sign-in" className="text-blue-400 hover:underline">Sign in</a></div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-gray-300 mb-1">Verification Code</label>
              <input type="text" value={code} onChange={e => setCode(e.target.value)} required className="w-full p-3 rounded bg-black/40 border border-white/20 text-white" placeholder="Enter code from your email" />
            </div>
            <button type="submit" disabled={loading} className="w-full py-3 rounded bg-blue-600 text-white font-bold hover:bg-blue-500 transition">{loading ? 'Verifying...' : 'Verify Email'}</button>
          </>
        )}
      </form>
    </div>
  );
}
