import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { formatPrice } from "@/utils/utils";
import StarRating from "./StartRating";

export default function ProductCard({ product }: { product: Product }) {
  const hasDiscount = product.discountPercentage > 0;
  const salePrice = hasDiscount
    ? product.price * (1 - product.discountPercentage / 100)
    : product.price;
  const reviewCount = product.reviews?.length ?? 0;
  const label = product.brand?.toUpperCase() ?? "STRIDE";

  return (
    <article className="group flex flex-col">
      <Link
        href={`/product/${product.id}`}
        className="relative mb-4 block overflow-hidden rounded-xl bg-secondary-bg aspect-3/4"
      >
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover duration-300 group-hover:scale-[1.03]"
        />
      </Link>

      <div className="flex flex-1 flex-col">
        <p className="mb-1 text-[11px] font-semibold tracking-widest text-muted">
          {label}
        </p>

        <Link href={`/product/${product.id}`}>
          <h3 className="mb-2 text-sm font-semibold leading-snug text-primary-tx duration-200 hover:text-accent sm:text-base">
            {product.title}
          </h3>
        </Link>

        <div className="mb-3 flex items-center gap-2">
          <StarRating rating={product.rating} />
          {reviewCount > 0 && (
            <span className="text-xs text-muted">({reviewCount})</span>
          )}
        </div>

        <div className="mb-4 flex items-baseline gap-2">
          <span className="text-base font-bold text-primary-tx">
            {formatPrice(salePrice)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-muted line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        <button
          type="button"
          className="mt-auto w-full rounded-lg bg-inverse py-2.5 text-sm font-semibold text-primary-bg duration-300 hover:bg-inverse/90 active:scale-[0.98]"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}
