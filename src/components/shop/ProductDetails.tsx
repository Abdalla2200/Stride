"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronRight, Minus, Plus } from "lucide-react";
import { Product } from "@/types";
import { getCategoryMeta } from "@/constants/categories";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/utils/utils";
import { useHydrated } from "@/utils/useHydrated";
import StarRating from "./StartRating";

type Tab = "description" | "specifications" | "reviews";

export default function ProductDetails({ product }: { product: Product }) {
  const images =
    product.images.length > 0 ? product.images : [product.thumbnail];
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<Tab>("description");
  const isHydrated = useHydrated();
  const quantity = useCartStore(
    (state) => state.items.find((item) => item.id === product.id)?.quantity ?? 0,
  );
  const addToCart = useCartStore((state) => state.addToCart);
  const increaseQty = useCartStore((state) => state.increaseQty);
  const decreaseQty = useCartStore((state) => state.decreaseQty);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const displayedQuantity = isHydrated ? quantity : 0;

  const hasDiscount = product.discountPercentage > 0;
  const salePrice = hasDiscount
    ? product.price * (1 - product.discountPercentage / 100)
    : product.price;
  const reviewCount = product.reviews?.length ?? 0;
  const categoryMeta = getCategoryMeta(product.category);
  const categoryLabel = categoryMeta?.breadcrumb ?? product.category;
  const detailImage = images[1] ?? images[0];

  const tabs: { id: Tab; label: string }[] = [
    { id: "description", label: "DESCRIPTION" },
    { id: "specifications", label: "SPECIFICATIONS" },
    { id: "reviews", label: `REVIEWS (${reviewCount})` },
  ];

  return (
    <section className="container py-sectionPadding-mob md:py-sectionPadding">
      <nav className="mb-8 flex flex-wrap items-center gap-1.5 text-sm text-muted">
        <Link href="/" className="duration-200 hover:text-primary-tx">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
        <Link
          href={`/category/${product.category}`}
          className="duration-200 hover:text-primary-tx"
        >
          {categoryLabel}
        </Link>
        <ChevronRight className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
        <span className="text-secondary-tx">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-20">
        <div className="flex flex-col-reverse gap-4 sm:flex-row sm:gap-5">
          <div className="flex gap-3 overflow-x-auto pb-1 sm:flex-col sm:overflow-visible sm:pb-0">
            {images.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setActiveImage(index)}
                className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 duration-200 sm:h-20 sm:w-20 ${
                  activeImage === index
                    ? "border-primary-tx"
                    : "border-transparent opacity-70 hover:border-muted hover:opacity-100"
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.title} view ${index + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          <div className="relative aspect-3/4 flex-1 overflow-hidden rounded-2xl bg-secondary-bg">
            <Image
              src={images[activeImage]}
              alt={product.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover duration-300"
              priority
            />
          </div>
        </div>

        <div className="flex flex-col">
          <p className="mb-2 text-[11px] font-semibold tracking-[0.2em] text-muted">
            {(product.brand ?? "STRIDE").toUpperCase()}
          </p>

          <h1 className="mb-4 text-3xl font-bold leading-tight text-primary-tx sm:text-4xl">
            {product.title}
          </h1>

          <div className="mb-5 flex flex-wrap items-center gap-2">
            <StarRating rating={product.rating} />
            <span className="text-sm text-secondary-tx">
              {product.rating.toFixed(1)}
              {reviewCount > 0 && (
                <span className="text-muted"> ({reviewCount} reviews)</span>
              )}
            </span>
          </div>

          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="text-3xl font-bold text-primary-tx">
              {formatPrice(salePrice)}
            </span>
            {hasDiscount && (
              <>
                <span className="text-lg text-muted line-through">
                  {formatPrice(product.price)}
                </span>
                <span className="rounded-full bg-accent/25 px-3 py-1 text-xs font-bold tracking-wide text-primary-tx">
                  {Math.round(product.discountPercentage)}% OFF
                </span>
              </>
            )}
          </div>

          <p className="mb-8 max-w-lg text-sm leading-relaxed text-secondary-tx sm:text-base">
            {product.description}
          </p>

          <div className="mb-4 flex items-center rounded-xl border border-secondary-bg bg-secondary-bg/60">
            <button
              type="button"
              onClick={() => {
                if (displayedQuantity === 1) {
                  removeFromCart(product.id);
                } else if (displayedQuantity > 1) {
                  decreaseQty(product.id);
                }
              }}
              disabled={displayedQuantity === 0}
              className="flex h-12 w-12 items-center justify-center text-secondary-tx duration-200 hover:text-primary-tx active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label={
                displayedQuantity === 1
                  ? `Remove ${product.title} from cart`
                  : `Decrease ${product.title} quantity`
              }
            >
              <Minus className="h-4 w-4" strokeWidth={2} />
            </button>
            <span className="flex-1 text-center text-base font-semibold text-primary-tx">
              {displayedQuantity}
            </span>
            <button
              type="button"
              onClick={() => {
                if (displayedQuantity === 0) {
                  addToCart(product);
                } else {
                  increaseQty(product.id);
                }
              }}
              className="flex h-12 w-12 items-center justify-center text-secondary-tx duration-200 hover:text-primary-tx active:scale-95"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>

          <button
            type="button"
            onClick={() => addToCart(product)}
            disabled={displayedQuantity > 0}
            className="w-full rounded-xl py-4 text-sm font-bold tracking-[0.15em] duration-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-muted disabled:text-primary-bg disabled:active:scale-100 bg-inverse text-primary-bg hover:bg-inverse/85"
          >
            {displayedQuantity > 0 ? "ADDED" : "ADD TO CART"}
          </button>
        </div>
      </div>

      <div className="mt-14 border-t border-secondary-bg pt-10 md:mt-20">
        <div className="mb-8 flex gap-6 overflow-x-auto border-b border-secondary-bg sm:gap-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 pb-4 text-xs font-semibold tracking-[0.15em] duration-200 sm:text-sm ${
                activeTab === tab.id
                  ? "border-b-2 border-primary-tx text-primary-tx"
                  : "text-muted hover:text-secondary-tx"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative h-[440px]  overflow-y-auto">
          {activeTab === "description" && (
            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="mb-4 text-xl font-bold text-primary-tx">
                  {product.brand ?? "Product Details"}
                </h2>
                <p className="mb-6 text-sm leading-relaxed text-secondary-tx sm:text-base">
                  {product.description}
                </p>
                {product.tags.length > 0 && (
                  <ul className="space-y-2">
                    {product.tags.map((tag) => (
                      <li
                        key={tag}
                        className="flex items-center gap-2 text-sm text-secondary-tx"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-secondary-bg">
                <Image
                  src={detailImage}
                  alt={`${product.title} detail`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover duration-300 hover:scale-[1.02]"
                />
              </div>
            </div>
          )}

          {activeTab === "specifications" && (
            <dl className="grid max-w-2xl grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
              <div>
                <dt className="mb-1 text-xs font-semibold tracking-widest text-muted">
                  BRAND
                </dt>
                <dd className="text-sm text-primary-tx">
                  {product.brand ?? "—"}
                </dd>
              </div>
              <div>
                <dt className="mb-1 text-xs font-semibold tracking-widest text-muted">
                  CATEGORY
                </dt>
                <dd className="text-sm text-primary-tx">
                  {categoryMeta?.name ?? product.category}
                </dd>
              </div>
              <div>
                <dt className="mb-1 text-xs font-semibold tracking-widest text-muted">
                  RATING
                </dt>
                <dd className="flex items-center gap-2 text-sm text-primary-tx">
                  <StarRating rating={product.rating} />
                  <span>{product.rating.toFixed(1)} / 5</span>
                </dd>
              </div>
              {product.tags.length > 0 && (
                <div className="sm:col-span-2">
                  <dt className="mb-2 text-xs font-semibold tracking-widest text-muted">
                    TAGS
                  </dt>
                  <dd className="flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-secondary-bg px-3 py-1 text-xs font-medium text-secondary-tx duration-200 hover:bg-accent/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          )}

          {activeTab === "reviews" && (
            <div className="max-w-3xl">
              {reviewCount > 0 ? (
                <ul className="space-y-6">
                  {product.reviews!.map((review, index) => (
                    <li
                      key={`${review.reviewerEmail}-${index}`}
                      className="rounded-xl border border-secondary-bg p-5 duration-200 hover:border-accent/40"
                    >
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold text-primary-tx">
                            {review.reviewerName}
                          </p>
                          <p className="text-xs text-muted">
                            {new Date(review.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                        <StarRating rating={review.rating} />
                      </div>
                      <p className="text-sm leading-relaxed text-secondary-tx">
                        {review.comment}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="py-8 text-center text-secondary-tx">
                  No reviews yet for this product.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
