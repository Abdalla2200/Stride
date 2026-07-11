import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductDetails from "@/components/shop/ProductDetails";
import { getProductById, getProductsByCategory } from "@/lib/api";
import { categoryIds } from "@/constants/categories";

export async function generateStaticParams() {
  const results = await Promise.all(
    categoryIds.map((c) => getProductsByCategory(c)),
  );
  const ids = results.flatMap((r) => r.products.map((p) => p.id));
  return ids.map((id) => ({ productId: String(id) }));
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
