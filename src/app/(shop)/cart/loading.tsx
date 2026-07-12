function CartItemSkeleton() {
  return (
    <div className="flex gap-4 py-5 first:pt-0 sm:gap-5">
      <div className="h-24 w-20 shrink-0 rounded-lg bg-[#dfddd7] sm:h-28 sm:w-24" />
      <div className="flex min-w-0 flex-1 flex-col pr-7">
        <div className="h-4 w-4/5 max-w-56 rounded-full bg-[#dfddd7]" />
        <div className="mt-2 h-3 w-3/5 max-w-40 rounded-full bg-[#dfddd7]" />
        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div className="h-9 w-28 rounded-md border border-[#dfddd7] bg-primary-bg" />
          <div>
            <div className="ml-auto h-3 w-12 rounded-full bg-[#dfddd7]" />
            <div className="mt-2 h-4 w-16 rounded-full bg-[#dfddd7]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <section
      className="container animate-pulse py-sectionPadding-mob md:py-sectionPadding"
      aria-busy="true"
      aria-label="Loading cart"
    >
      <div className="h-10 w-56 rounded-lg bg-[#dfddd7] sm:h-12 sm:w-72" />

      <div className="mt-7 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="divide-y divide-secondary-bg border-t border-secondary-bg pt-5">
          {Array.from({ length: 3 }, (_, index) => (
            <CartItemSkeleton key={index} />
          ))}
        </div>

        <div className="rounded-xl bg-secondary-bg p-5 sm:p-6">
          <div className="h-5 w-32 rounded-full bg-[#dfddd7]" />
          <div className="mt-7 space-y-4 border-b border-primary-tx/10 pb-5">
            <div className="flex items-center justify-between">
              <div className="h-3 w-16 rounded-full bg-[#dfddd7]" />
              <div className="h-3 w-14 rounded-full bg-[#dfddd7]" />
            </div>
            <div className="flex items-center justify-between">
              <div className="h-3 w-16 rounded-full bg-[#dfddd7]" />
              <div className="h-3 w-14 rounded-full bg-[#dfddd7]" />
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between">
            <div className="h-5 w-12 rounded-full bg-[#dfddd7]" />
            <div className="h-6 w-20 rounded-full bg-[#dfddd7]" />
          </div>
          <div className="mt-6 h-12 w-full rounded-lg bg-inverse/25" />
        </div>
      </div>
      <span className="sr-only" aria-live="polite">
        Loading cart
      </span>
    </section>
  );
}
