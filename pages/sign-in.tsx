import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#18122B] via-[#0F0F1C] to-[#4B2067]">
      <div className="bg-black/60 p-8 rounded-2xl shadow-2xl">
        <SignIn path="/sign-in" routing="path" />
      </div>
    </div>
  );
}
