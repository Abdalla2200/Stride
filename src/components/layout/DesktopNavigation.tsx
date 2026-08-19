"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";
import CartIcon from "@/components/cart/CartIcon";
import { navigationLinks } from "@/components/layout/navigationLinks";
import LogoutButton from "@/components/layout/LogoutButton";
import { Button } from "@/components/UI/button";

export default function DesktopNavigation({
  isLoggedIn,
}: {
  isLoggedIn: boolean;
}) {
  const pathname = usePathname();

  return (
    <>
      <ul className="flex items-center gap-4 md:gap-8">
        {navigationLinks.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`py-2 duration-200 hover:text-accent ${
                  isActive ? "text-accent" : "text-primary-bg"
                }`}
              >
                {link.title}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center gap-4 lg:gap-8 text-primary-bg">
        <Search className="cursor-pointer duration-300 hover:scale-[1.150]" />
        <CartIcon />
        {isLoggedIn ? (
          <LogoutButton className="rounded-lg bg-primary-bg px-2 py-1 h-auto text-xs font-semibold text-primary-tx duration-300 hover:bg-primary-bg/80 lg:px-4 lg:py-2 lg:text-sm" />
        ) : (
          <Button
            asChild
            className="rounded-lg bg-primary-bg px-2 py-1 h-auto text-xs font-semibold text-primary-tx duration-300 hover:bg-primary-bg/85 lg:px-4 lg:py-2 lg:text-sm"
          >
            <Link href="/login">SIGN IN</Link>
          </Button>
        )}
      </div>
    </>
  );
}
