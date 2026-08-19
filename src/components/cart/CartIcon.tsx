"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export default function CartIcon() {
  // With skipHydration: true the store starts empty on both server and client,
  // so totalQuantity is reliably 0 until CartAuthSync populates it — no
  // hydration mismatch, no useHydrated wrapper needed.
  const totalQuantity = useCartStore((state) => state.getTotalQuantity());

  return (
    <Link
      href="/cart"
      className="relative text-primary-bg"
      aria-label={`Cart, ${totalQuantity} item${totalQuantity === 1 ? "" : "s"}`}
    >
      <ShoppingCart
        className="h-6 w-6 duration-300 hover:scale-[1.150]"
        strokeWidth={1.75}
      />
      {totalQuantity > 0 && (
        <span className="absolute -top-2.5 -right-2.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary-bg px-1 text-[10px] font-bold text-inverse">
          {totalQuantity}
        </span>
      )}
    </Link>
  );
}
