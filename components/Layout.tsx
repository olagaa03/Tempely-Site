import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { SignedIn, SignedOut } from '@clerk/nextjs';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SignedIn>
        <div className="flex min-h-screen bg-[#f9f9fb]">
          <Sidebar />
          <div className="flex-1 flex flex-col min-h-screen">
            <Topbar />
            <main className="flex-1 pt-20 px-4 md:px-8 bg-[#f9f9fb]">{children}</main>
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        {children}
      </SignedOut>
    </>
  );
}
