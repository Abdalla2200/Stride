import ProductCard from "@/components/shop/ProductCard";
import { getTopRatedProductsByCategory } from "@/lib/api";

export default async function TopRated() {
  const products = await getTopRatedProductsByCategory();

  return (
    <section className="container py-sectionPadding-mob md:py-sectionPadding my-sectionMargine-mob md:my-sectionMargine">
      <h2 className="text-primary-tx font-bold text-3xl text-center sm:text-start sm:text-4xl md:text-5xl mb-12">
        Top Rated This Week
      </h2>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} hideAddToCart />
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-secondary-tx">
          No top rated products available right now.
        </p>
      )}
    </section>
  );
}
