import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { formatPrice } from "@/utils/utils";
import StarRating from "./StartRating";
import AddToCartBtn from "../cart/AddToCartBtn";

export default function ProductCard({
  product,
  hideAddToCart = false,
}: {
  product: Product;
  hideAddToCart?: boolean;
}) {
  const hasDiscount = product.discountPercentage > 0;
  const salePrice = hasDiscount
    ? product.price * (1 - product.discountPercentage / 100)
    : product.price;
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

        <div className="mb-3">
          <StarRating rating={product.rating} />
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
        {!hideAddToCart && <AddToCartBtn product={product} />}
      </div>
    </article>
  );
}
