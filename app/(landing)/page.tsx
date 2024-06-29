import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <>
      <div>Landing Page</div>
      <Link href="/sign-in">
        <Button>
          SignIn
        </Button>
      </Link>
      <Link href="/sign-up">
        <Button>
          SignUp
        </Button>
      </Link>
    </>
  );
}
