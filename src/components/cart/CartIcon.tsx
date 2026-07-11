import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CartIcon() {
  return (
    <Link href="/cart" className="relative text-primary-bg">
      <ShoppingCart
        className="h-6 w-6 duration-300 hover:scale-[1.150]"
        strokeWidth={1.75}
      />
      <span className="absolute -top-2.5 -right-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-primary-tx">
        2
      </span>
    </Link>
  );
}
