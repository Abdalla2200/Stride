import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[58vh] items-center px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/20 text-primary-tx">
          <Compass className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
        </div>
        <p className="mt-7 text-sm font-bold tracking-[0.3em] text-accent">404</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-primary-tx sm:text-4xl">
          This path leads nowhere.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-secondary-tx sm:text-base">
          The page you’re looking for may have moved, changed, or never existed. Let’s get you back to something good.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-inverse px-5 py-3 text-sm font-bold text-primary-bg transition-colors hover:bg-inverse/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          BACK TO HOME
        </Link>
      </div>
    </section>
  );
}
