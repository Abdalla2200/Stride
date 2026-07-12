"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/utils/utils";
import { useHydrated } from "@/utils/useHydrated";

export default function CartPage() {
  const isHydrated = useHydrated();
  const items = useCartStore((state) => state.items);
  const increaseQty = useCartStore((state) => state.increaseQty);
  const decreaseQty = useCartStore((state) => state.decreaseQty);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const subtotal = useCartStore((state) => state.getTotalPrice());
  const totalQuantity = useCartStore((state) => state.getTotalQuantity());
  const discount = items.reduce((total, item) => {
    const discountPercentage = Math.min(
      Math.max(item.discountPercentage ?? 0, 0),
      100,
    );
    return total + item.price * item.quantity * (discountPercentage / 100);
  }, 0);
  const total = subtotal - discount;

  if (!isHydrated) {
    return (
      <section
        className="container animate-pulse py-sectionPadding-mob md:py-sectionPadding"
        aria-busy="true"
        aria-label="Loading cart"
      >
        <div className="h-10 w-56 rounded-lg bg-[#dfddd7] sm:h-12 sm:w-72" />
        <div className="mt-7 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_380px]">
          <div className="space-y-5">
            {Array.from({ length: 3 }, (_, index) => (
              <div key={index} className="h-28 rounded-lg bg-[#dfddd7]" />
            ))}
          </div>
          <div className="h-72 rounded-xl bg-secondary-bg" />
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="container flex min-h-[58vh] items-center justify-center py-sectionPadding-mob md:py-sectionPadding">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-primary-tx">
            <ShoppingBag className="h-7 w-7" strokeWidth={1.7} aria-hidden="true" />
          </div>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-primary-tx sm:text-4xl">
            Your cart is empty.
          </h1>
          <p className="mt-3 text-sm leading-6 text-secondary-tx sm:text-base">
            Find something that moves with you and add it to your bag.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex min-h-11 items-center justify-center rounded-lg bg-inverse px-5 py-3 text-sm font-bold text-primary-bg transition-colors hover:bg-inverse/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            CONTINUE SHOPPING
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container py-sectionPadding-mob md:py-sectionPadding">
      <h1 className="border-b border-secondary-bg pb-4 text-3xl font-bold tracking-tight text-primary-tx sm:text-4xl">
        Your Cart <span className="text-secondary-tx">({totalQuantity} items)</span>
      </h1>

      <div className="mt-7 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_380px]">
        <ul className="divide-y divide-secondary-bg">
          {items.map((item) => {
            const image = item.images[0] ?? "/logo.png";
            const discountPercentage = Math.min(
              Math.max(item.discountPercentage ?? 0, 0),
              100,
            );
            const hasDiscount = discountPercentage > 0;
            const salePrice = item.price * (1 - discountPercentage / 100);
            const lineSubtotal = item.price * item.quantity;
            const lineTotal = salePrice * item.quantity;

            return (
              <li key={item.id} className="relative flex gap-4 py-5 first:pt-0 sm:gap-5">
                <Link
                  href={`/product/${item.id}`}
                  className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-secondary-bg sm:h-28 sm:w-24"
                >
                  <Image
                    src={image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 80px, 96px"
                    className="object-cover"
                  />
                </Link>

                <div className="flex min-w-0 flex-1 flex-col pr-7">
                  <Link
                    href={`/product/${item.id}`}
                    className="w-fit text-sm font-bold leading-snug text-primary-tx transition-colors hover:text-accent sm:text-base"
                  >
                    {item.title}
                  </Link>
                  <p className="mt-1 line-clamp-1 text-xs text-muted">
                    {item.description}
                  </p>

                  <div className="mt-auto flex items-end justify-between gap-3 pt-4">
                    <div className="flex h-9 items-center rounded-md border border-secondary-bg">
                      <button
                        type="button"
                        onClick={() =>
                          item.quantity === 1
                            ? removeFromCart(item.id)
                            : decreaseQty(item.id)
                        }
                        aria-label={
                          item.quantity === 1
                            ? `Remove ${item.title} from cart`
                            : `Decrease ${item.title} quantity`
                        }
                        className="flex h-full w-9 items-center justify-center text-secondary-tx transition-colors hover:text-primary-tx"
                      >
                        <Minus className="h-3.5 w-3.5" strokeWidth={2} />
                      </button>
                      <span className="w-8 text-center text-sm font-medium text-primary-tx">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => increaseQty(item.id)}
                        aria-label={`Increase ${item.title} quantity`}
                        className="flex h-full w-9 items-center justify-center text-secondary-tx transition-colors hover:text-primary-tx"
                      >
                        <Plus className="h-3.5 w-3.5" strokeWidth={2} />
                      </button>
                    </div>
                    <div className="text-right">
                      {hasDiscount && (
                        <p className="text-xs text-muted line-through">
                          {formatPrice(lineSubtotal)}
                        </p>
                      )}
                      <p className="text-sm font-bold text-primary-tx sm:text-base">
                        {formatPrice(lineTotal)}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Remove ${item.title} from cart`}
                  className="absolute top-0 right-0 p-1 text-muted transition-colors hover:text-primary-tx"
                >
                  <X className="h-4 w-4" strokeWidth={1.8} />
                </button>
              </li>
            );
          })}
        </ul>

        <aside className="rounded-xl bg-secondary-bg p-5 sm:p-6 lg:sticky lg:top-6">
          <h2 className="text-base font-bold text-primary-tx">Order Summary</h2>
          <dl className="mt-6 space-y-3 border-b border-primary-tx/10 pb-5 text-sm">
            <div className="flex items-center justify-between gap-4 text-secondary-tx">
              <dt>Subtotal</dt>
              <dd className="font-medium text-primary-tx">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex items-center justify-between gap-4 text-secondary-tx">
              <dt>Discount</dt>
              <dd className="font-medium text-primary-tx">
                {discount > 0 ? `-${formatPrice(discount)}` : formatPrice(0)}
              </dd>
            </div>
          </dl>
          <div className="mt-5 flex items-center justify-between gap-4">
            <span className="text-base font-bold text-primary-tx">Total</span>
            <span className="text-lg font-bold text-primary-tx">{formatPrice(total)}</span>
          </div>
          <Link
            href="/checkout"
            className="mt-6 flex min-h-12 w-full items-center justify-center rounded-lg bg-inverse px-4 py-3 text-center text-xs font-bold tracking-[0.12em] text-primary-bg transition-colors hover:bg-inverse/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            PROCEED TO CHECKOUT
          </Link>
        </aside>
      </div>
    </section>
  );
}
