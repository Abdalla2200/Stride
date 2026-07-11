export default function Loading() {
  return (
    <section
      className="flex min-h-[58vh] items-center justify-center px-4 py-16"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex max-w-sm flex-col items-center text-center">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-secondary-bg" />
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-accent" />
          <div className="h-2 w-2 rounded-full bg-accent" />
        </div>
        <p className="mt-7 text-xs font-bold tracking-[0.22em] text-primary-tx">
          PREPARING YOUR EXPERIENCE
        </p>
        <p className="mt-2 text-sm leading-6 text-secondary-tx">
          Loading the latest from Stride. This will only take a moment.
        </p>
      </div>
    </section>
  );
}
