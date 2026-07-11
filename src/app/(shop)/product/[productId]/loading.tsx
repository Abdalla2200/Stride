function Line({ className }: { className: string }) {
  return <div className={`rounded-full bg-[#dfddd7] ${className}`} />;
}

export default function Loading() {
  return (
    <section
      className="container animate-pulse py-sectionPadding-mob md:py-sectionPadding"
      aria-busy="true"
      aria-label="Loading product details"
    >
      <div className="mb-8 h-4 w-64 max-w-full rounded-full bg-[#dfddd7]" />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-20">
        <div className="flex flex-col-reverse gap-4 sm:flex-row sm:gap-5">
          <div className="flex gap-3 overflow-hidden sm:flex-col">
            {Array.from({ length: 4 }, (_, index) => (
              <div
                key={index}
                className="h-16 w-16 shrink-0 rounded-xl bg-[#dfddd7] sm:h-20 sm:w-20"
              />
            ))}
          </div>
          <div className="aspect-3/4 flex-1 rounded-2xl bg-[#dfddd7]" />
        </div>

        <div className="pt-1">
          <Line className="h-3 w-20" />
          <div className="mt-4 h-10 w-5/6 rounded-lg bg-[#dfddd7] sm:h-12" />
          <div className="mt-5 flex gap-1.5">
            {Array.from({ length: 5 }, (_, index) => (
              <span key={index} className="h-3 w-3 rounded-full bg-[#dfddd7]" />
            ))}
            <Line className="ml-2 h-3 w-20" />
          </div>
          <Line className="mt-7 h-9 w-32" />
          <div className="mt-7 space-y-2.5">
            <Line className="h-4 w-full" />
            <Line className="h-4 w-11/12" />
            <Line className="h-4 w-3/4" />
          </div>
          <div className="mt-8 flex h-12 items-center justify-between rounded-xl bg-[#dfddd7] px-4">
            <span className="h-4 w-4 rounded-full bg-primary-bg/80" />
            <span className="h-4 w-5 rounded-full bg-primary-bg/80" />
            <span className="h-4 w-4 rounded-full bg-primary-bg/80" />
          </div>
          <div className="mt-4 h-14 w-full rounded-xl bg-inverse/25" />
        </div>
      </div>

      <div className="mt-14 border-t border-secondary-bg pt-10 md:mt-20">
        <div className="flex gap-8 border-b border-secondary-bg pb-4 sm:gap-10">
          <Line className="h-3 w-24" />
          <Line className="h-3 w-28" />
          <Line className="h-3 w-20" />
        </div>
        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-3">
            <Line className="h-6 w-48" />
            <Line className="h-4 w-full" />
            <Line className="h-4 w-11/12" />
            <Line className="h-4 w-4/5" />
          </div>
          <div className="aspect-4/3 rounded-2xl bg-[#dfddd7]" />
        </div>
      </div>
      <span className="sr-only" aria-live="polite">
        Loading product details
      </span>
    </section>
  );
}
