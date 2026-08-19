import Link from "next/link";
import headerLogoImg from "@/assets/headerLogo.png";
import Image from "next/image";
import DesktopNavigation from "@/components/layout/DesktopNavigation";
import MobileNavigation from "@/components/layout/MobileNavigation";
import { createClient } from "@/lib/supabase/server";

export default async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isLoggedIn = user !== null;

  return (
    <header className="relative z-50 bg-inverse py-2">
      <nav className="container hidden items-center justify-between gap-4 py-2 md:flex">
        <Link href="/">
          <Image
            src={headerLogoImg}
            loading="eager"
            alt="Stride Logo"
            className="object-cover w-35"
          />
        </Link>
        <DesktopNavigation isLoggedIn={isLoggedIn} />
      </nav>
      <MobileNavigation isLoggedIn={isLoggedIn} />
    </header>
  );
}
