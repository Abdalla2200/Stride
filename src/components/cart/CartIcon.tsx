"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useHydrated } from "@/utils/useHydrated";

export default function CartIcon() {
  const isHydrated = useHydrated();
  const totalQuantity = useCartStore((state) => state.getTotalQuantity());
  const displayedQuantity = isHydrated ? totalQuantity : 0;

  return (
    <Link href="/cart" className="relative text-primary-bg" aria-label={`Cart, ${displayedQuantity} item${displayedQuantity === 1 ? "" : "s"}`}>
      <ShoppingCart
        className="h-6 w-6 duration-300 hover:scale-[1.150]"
        strokeWidth={1.75}
      />
      {displayedQuantity > 0 && (
        <span className="absolute -top-2.5 -right-2.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-primary-tx">
          {displayedQuantity}
        </span>
      )}
    </Link>
  );
}
