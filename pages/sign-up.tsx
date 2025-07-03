import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#18122B] via-[#0F0F1C] to-[#4B2067]">
      <div className="bg-black/60 p-8 rounded-2xl shadow-2xl">
        <SignUp path="/sign-up" routing="path" />
      </div>
    </div>
  );
}
