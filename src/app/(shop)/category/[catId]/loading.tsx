function ProductCardSkeleton() {
  return (
    <article className="animate-pulse">
      <div className="aspect-3/4 rounded-xl bg-[#dfddd7]" />
      <div className="mt-4 h-3 w-20 rounded-full bg-[#dfddd7]" />
      <div className="mt-3 h-4 w-4/5 rounded-full bg-[#dfddd7]" />
      <div className="mt-2 h-4 w-2/5 rounded-full bg-[#dfddd7]" />
      <div className="mt-4 flex gap-1.5">
        <span className="h-3 w-3 rounded-full bg-[#dfddd7]" />
        <span className="h-3 w-3 rounded-full bg-[#dfddd7]" />
        <span className="h-3 w-3 rounded-full bg-[#dfddd7]" />
        <span className="h-3 w-3 rounded-full bg-[#dfddd7]" />
        <span className="h-3 w-3 rounded-full bg-[#dfddd7]" />
      </div>
      <div className="mt-4 h-5 w-24 rounded-full bg-[#dfddd7]" />
      <div className="mt-5 h-10 w-full rounded-lg bg-[#dfddd7]" />
    </article>
  );
}

export default function Loading() {
  return (
    <section
      className="container py-sectionPadding-mob md:py-sectionPadding"
      aria-busy="true"
      aria-label="Loading products"
    >
      <div className="animate-pulse">
        <div className="mb-6 h-4 w-32 rounded-full bg-[#dfddd7]" />
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="w-full max-w-2xl">
            <div className="h-10 w-3/4 rounded-lg bg-[#dfddd7] sm:h-12" />
            <div className="mt-4 h-4 w-full max-w-xl rounded-full bg-[#dfddd7]" />
            <div className="mt-2 h-4 w-4/5 rounded-full bg-[#dfddd7]" />
          </div>
          <div className="h-3 w-24 rounded-full bg-[#dfddd7]" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }, (_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
      <span className="sr-only" aria-live="polite">
        Loading products
      </span>
    </section>
  );
}
