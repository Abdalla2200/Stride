"use client";
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/types";
import { useState } from "react";
import { Button } from "@/components/UI/button";

export default function AddToCartBtn({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);

  const addBtnDelay = async () => {
    setIsAddBtnClicked(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setIsAddBtnClicked(false);
  };

  const handleAddToCartBtn = () => {
    addBtnDelay();
    addToCart(product);
  };

  return (
    <Button
      onClick={handleAddToCartBtn}
      type="button"
      disabled={isAddBtnClicked}
      className={`mt-auto w-full rounded-lg bg-inverse py-2.5 h-auto text-sm font-semibold text-primary-bg duration-300 hover:bg-inverse/90 active:scale-[0.98] ${
        isAddBtnClicked && "bg-gray-600! cursor-not-allowed"
      }`}
    >
      {isAddBtnClicked ? "Adding ..." : "Add to cart"}
    </Button>
  );
}
