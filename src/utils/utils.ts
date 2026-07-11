import { Star } from "lucide-react";

export function formatPrice(price: number) {
  return `$${price.toFixed(2)}`;
}
