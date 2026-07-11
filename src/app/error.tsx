"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="flex min-h-[58vh] items-center px-4 py-12 sm:py-16">
      <div className="mx-auto w-full max-w-xl rounded-2xl border border-black/8 bg-secondary-bg px-6 py-10 text-center shadow-[0_12px_40px_rgba(17,17,17,0.06)] sm:px-10 sm:py-12">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/20 text-primary-tx">
          <AlertTriangle className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
        </div>
        <p className="mt-6 text-xs font-bold tracking-[0.22em] text-secondary-tx">
          SOMETHING WENT WRONG
        </p>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-primary-tx sm:text-3xl">
          We couldn’t load this page.
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-secondary-tx sm:text-base">
          A temporary issue interrupted your visit. Please try again—we’ll pick up right where you left off.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-inverse px-5 py-3 text-sm font-bold text-primary-bg transition-colors hover:bg-inverse/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          TRY AGAIN
        </button>
      </div>
    </section>
  );
}
