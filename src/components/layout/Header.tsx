"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Menu, Search, X } from "lucide-react";
import CartIcon from "../cart/CartIcon";
import headerLogoImg from "../../assets/headerLogo.png";
import Image from "next/image";

const navLinks = [
  { title: "HOME", href: "/" },
  { title: "SHIRTS", href: "/category/mens-shirts" },
  { title: "SHOES", href: "/category/mens-shoes" },
  { title: "WATCHES", href: "/category/mens-watches" },
  { title: "SUNGLASSES", href: "/category/sunglasses" },
];

export default function Header() {
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
    <header className="relative z-50 bg-inverse py-2">
      {/* Desktop navigation */}
      <nav className="container hidden items-center justify-between gap-4 py-2 md:flex">
        <Link href="/">
          <Image
            src={headerLogoImg}
            loading="eager"
            alt="Stride Logo"
            className="object-cover w-[140px]"
          />
        </Link>

        <ul className="flex items-center gap-4 md:gap-8">
          {navLinks.map((link) => {
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
          <Link href="/login">
            <button className="rounded-lg bg-primary-bg px-2 lg:px-4 py-1 lg:py-2 text-xs md:text-sm font-semibold text-primary-tx duration-300 hover:bg-primary-bg/85">
              SIGN IN
            </button>
          </Link>
        </div>
      </nav>

      {/* Mobile header (closed state) */}
      <nav className="container relative flex items-center justify-between py-2 md:hidden">
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(true)}
          className="text-primary-bg"
        >
          <Menu className="h-6 w-6" strokeWidth={2} />
        </button>

        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 text-xl font-bold tracking-[-1.2px] text-primary-bg"
        >
          STRIDE
        </Link>
        <CartIcon />
      </nav>

      {/* Mobile menu overlay (open state) */}
      <div
        className={`fixed inset-0 z-50 flex flex-col bg-inverse transition-all duration-400 ease-in-out md:hidden w-[85%] ${
          isMenuOpen
            ? "visible translate-x-0 opacity-100"
            : "invisible -translate-x-2 opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="container flex flex-1 flex-col py-4">
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/"
              onClick={closeMenu}
              className="text-xl font-bold tracking-[-1.2px] text-primary-bg"
            >
              STRIDE
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={closeMenu}
              className="text-primary-bg"
            >
              <X className="h-6 w-6" strokeWidth={2} />
            </button>
          </div>

          <div className="relative mb-6">
            <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              placeholder="Search products..."
              className="w-full rounded-xl bg-[#1f1f1f] py-3 pr-4 pl-11 text-sm text-primary-bg placeholder:text-muted outline-none"
            />
          </div>

          <ul className="flex-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <li key={link.href} className="border-b border-white/10">
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className={`flex items-center justify-between py-4 text-sm font-bold tracking-wide duration-200 hover:text-accent ${
                      isActive ? "text-accent" : "text-primary-bg"
                    }`}
                  >
                    {link.title}
                    <ChevronRight
                      className="h-4 w-4 text-muted"
                      strokeWidth={2}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link href="/login" onClick={closeMenu} className="mt-6 block">
            <button className="w-full rounded-xl bg-primary-bg py-3.5 text-sm font-bold tracking-wide text-primary-tx duration-300 hover:bg-primary-bg/85">
              SIGN IN
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
