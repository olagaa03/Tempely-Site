import { SignedIn, SignedOut } from "@clerk/nextjs";
import LoggedOutHome from "@/components/home/LoggedOutHome";
import LoggedInHome from "@/components/home/LoggedInHome";

export default function HomePage() {
  return (
    <>
      <SignedOut>
        <LoggedOutHome />
      </SignedOut>

      <SignedIn>
        <LoggedInHome />
      </SignedIn>
    </>
  );
}
