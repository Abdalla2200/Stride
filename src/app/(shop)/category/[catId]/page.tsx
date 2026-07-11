import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import ProductCard from "@/components/shop/ProductCard";
import { getProductsByCategory } from "@/lib/api";
import { categoryIds, getCategoryMeta } from "@/constants/categories";
import { Metadata } from "next";

// getStaticParams for SSG
export async function generateStaticParams() {
  return categoryIds.map((catId) => ({ catId }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ catId: string }>;
}): Promise<Metadata> {
  const { catId } = await params;
  const category = getCategoryMeta(catId);

  if (!category) {
    return { title: "Stride | Unknown Category" };
  }

  return {
    title: `Stride | ${category.name}`,
    description: category.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ catId: string }>;
}) {
  const { catId } = await params;
  const category = getCategoryMeta(catId);

  if (!category) {
    notFound();
  }
  const { products, total } = await getProductsByCategory(catId);

  return (
    <section className="container py-sectionPadding-mob md:py-sectionPadding">
      <nav className="mb-6 flex items-center gap-1.5 text-sm text-muted">
        <Link href="/" className="duration-200 hover:text-primary-tx">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
        <span className="text-secondary-tx">{category.breadcrumb}</span>
      </nav>

      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <h1 className="mb-3 text-3xl font-bold text-primary-tx sm:text-4xl md:text-5xl">
            {category.name}
          </h1>
          <p className="text-sm leading-relaxed text-secondary-tx sm:text-base">
            {category.description}
          </p>
        </div>
        <p className="shrink-0 text-xs font-semibold tracking-widest text-muted">
          {total} PRODUCTS
        </p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-secondary-tx">
          No products found in this category.
        </p>
      )}
    </section>
  );
}
