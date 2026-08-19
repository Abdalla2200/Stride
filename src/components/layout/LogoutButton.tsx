"use client";

import { useState } from "react";
import { LogOut, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/UI/button";

export default function LogoutButton({ className }: { className?: string }) {
  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => {
    setError(null);
    setIsLoggingOut(true);

    try {
      const supabase = createClient();
      const { error: signOutError } = await supabase.auth.signOut();

      if (!signOutError) {
        clearCart();
        router.push("/login");
        router.refresh();
      } else {
        setError(signOutError.message ?? "Unable to log out. Please try again.");
      }
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <Button
        type="button"
        onClick={() => setIsConfirmOpen(true)}
        className={className}
      >
        LOG OUT
      </Button>

      {isConfirmOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 px-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="logout-dialog-title"
        >
          <div className="w-full max-w-sm rounded-2xl bg-primary-bg p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/20 text-primary-tx">
                <LogOut className="h-5 w-5" aria-hidden="true" />
              </div>
              <Button
                type="button"
                onClick={() => setIsConfirmOpen(false)}
                aria-label="Close logout confirmation"
                variant="ghost"
                size="icon"
                className="text-dim hover:bg-secondary-bg hover:text-primary-tx"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </Button>
            </div>

            <h2
              id="logout-dialog-title"
              className="mt-5 text-xl font-bold tracking-tight text-primary-tx"
            >
              Log out of your account?
            </h2>
            <p className="mt-2 text-sm leading-6 text-secondary-tx">
              You can sign back in whenever you are ready.
            </p>
            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button
                type="button"
                onClick={() => setIsConfirmOpen(false)}
                disabled={isLoggingOut}
                variant="outline"
                className="rounded-lg px-4 py-3 h-auto text-xs font-bold tracking-wide text-primary-tx border-secondary-bg hover:bg-secondary-bg disabled:cursor-not-allowed"
              >
                CANCEL
              </Button>
              <Button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="rounded-lg bg-inverse px-4 py-3 h-auto text-xs font-bold tracking-wide text-primary-bg hover:bg-inverse/85 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoggingOut ? "LOGGING OUT..." : "LOG OUT"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
