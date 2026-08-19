"use client";

import { useCartStore } from "@/store/cartStore";
import { Product } from "@/types";
import { useState } from "react";
import { Button } from "@/components/UI/button";
import { toast } from "sonner";

export default function AddToCartBtn({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = () => {
    setIsLoading(true);
    addToCart(product).catch(() => {
      toast.error("Failed to add to cart. Please try again.");
    });
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <Button
      onClick={handleAddToCart}
      type="button"
      disabled={isLoading}
      className={`mt-auto w-full rounded-lg bg-inverse py-2.5 h-auto text-sm font-semibold text-primary-bg duration-300 hover:bg-inverse/90 active:scale-[0.98] ${
        isLoading && "bg-gray-600! cursor-not-allowed"
      }`}
    >
      {isLoading ? "Adding..." : "Add to cart"}
    </Button>
  );
}
