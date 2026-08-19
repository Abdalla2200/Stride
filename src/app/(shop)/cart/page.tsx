import type { Metadata } from "next";
import CartPageContent from "@/components/cart/CartPageContent";

export const metadata: Metadata = {
  title: "Stride | Your Cart",
  description: "Review and manage the items in your shopping cart.",
};

export default function CartPage() {
  return <CartPageContent />;
}
