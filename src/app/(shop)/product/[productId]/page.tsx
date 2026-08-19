import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductDetails from "@/components/shop/ProductDetails";
import { getProductById, getProductIdsByCategory } from "@/lib/api";
import { categoryIds } from "@/constants/categories";

/**
 * Only fetch product IDs at build time — avoids downloading full product
 * payloads (images, descriptions, reviews, etc.) just to get the id list.
 */
export async function generateStaticParams() {
  const allIds = await Promise.all(
    categoryIds.map((c) => getProductIdsByCategory(c)),
  );
  return allIds.flat().map((id) => ({ productId: String(id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productId: string }>;
}): Promise<Metadata> {
  const { productId } = await params;
  const product = await getProductById(productId);

  if (!product) {
    return { title: "Stride | Product Not Found" };
  }

  return {
    title: `Stride | ${product.title}`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const product = await getProductById(productId);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}
