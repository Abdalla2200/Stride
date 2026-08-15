"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, Menu, Search, X } from "lucide-react";
import { usePathname } from "next/navigation";
import CartIcon from "../cart/CartIcon";
import { navigationLinks } from "./navigationLinks";
import LogoutButton from "./LogoutButton";

export default function MobileNavigation({
  isLoggedIn,
}: {
  isLoggedIn: boolean;
}) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <nav className="container relative flex items-center justify-between py-2 md:hidden">
        <button type="button" aria-label="Open menu" aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen(true)} className="text-primary-bg">
          <Menu className="h-6 w-6" strokeWidth={2} />
        </button>
        <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-xl font-bold tracking-[-1.2px] text-primary-bg">STRIDE</Link>
        <CartIcon />
      </nav>

      <div className={`fixed inset-0 z-50 flex w-[85%] flex-col bg-inverse transition-all duration-400 ease-in-out md:hidden ${isMenuOpen ? "visible translate-x-0 opacity-100" : "invisible -translate-x-2 pointer-events-none opacity-0"}`} aria-hidden={!isMenuOpen}>
        <div className="container flex flex-1 flex-col py-4">
          <div className="mb-6 flex items-center justify-between">
            <Link href="/" onClick={closeMenu} className="text-xl font-bold tracking-[-1.2px] text-primary-bg">STRIDE</Link>
            <button type="button" aria-label="Close menu" onClick={closeMenu} className="text-primary-bg">
              <X className="h-6 w-6" strokeWidth={2} />
            </button>
          </div>

          <div className="relative mb-6">
            <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted" />
            <input name="search" type="search" placeholder="Search products..." className="w-full rounded-xl bg-[#1f1f1f] py-3 pr-4 pl-11 text-sm text-primary-bg placeholder:text-muted outline-none" />
          </div>

          <ul className="flex-1">
            {navigationLinks.map((link) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <li key={link.href} className="border-b border-white/10">
                  <Link href={link.href} onClick={closeMenu} className={`flex items-center justify-between py-4 text-sm font-bold tracking-wide duration-200 hover:text-accent ${isActive ? "text-accent" : "text-primary-bg"}`}>
                    {link.title}
                    <ChevronRight className="h-4 w-4 text-muted" strokeWidth={2} />
                  </Link>
                </li>
              );
            })}
          </ul>

          {isLoggedIn ? (
            <div className="mt-6">
              <LogoutButton className="w-full rounded-xl bg-primary-bg py-3.5 text-sm font-bold tracking-wide text-primary-tx duration-300 hover:bg-primary-bg/85" />
            </div>
          ) : (
            <Link href="/login" onClick={closeMenu} className="mt-6 block rounded-xl bg-primary-bg py-3.5 text-center text-sm font-bold tracking-wide text-primary-tx duration-300 hover:bg-primary-bg/85">SIGN IN</Link>
          )}
        </div>
      </div>
    </>
  );
}
