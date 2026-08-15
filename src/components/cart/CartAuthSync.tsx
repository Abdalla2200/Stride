// CartAuthSync.tsx
"use client";

import { useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { useCartStore } from "@/store/cartStore";
import { fetchCartItems, mergeGuestCart } from "@/actions/cartAction";

export default function CartAuthSync() {
  const setItems = useCartStore((state) => state.setItems);
  const hasHydrated = useRef(false);
  const previousUserId = useRef<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUserId = session?.user?.id ?? null;

        // First firing ever after mount — just hydrate from whatever
        // session already exists, never merge.
        if (!hasHydrated.current) {
          hasHydrated.current = true;
          previousUserId.current = currentUserId;
          if (currentUserId) {
            setItems(await fetchCartItems());
          }
          return;
        }

        // Same user as before — this is a token refresh / tab-focus
        // re-broadcast, not a real sign-in or sign-out. Ignore it.
        if (currentUserId === previousUserId.current) {
          return;
        }

        previousUserId.current = currentUserId;

        if (currentUserId) {
          // A real transition into a session: merge whatever's
          // sitting locally, then hydrate from the DB.
          const guestItems = useCartStore.getState().items;
          if (guestItems.length > 0) {
            await mergeGuestCart(
              guestItems.map((item) => ({
                productId: item.id,
                quantity: item.quantity,
              })),
            );
          }
          setItems(await fetchCartItems());
        } else {
          setItems([]);
        }
      },
    );

    return () => listener.subscription.unsubscribe();
  }, [setItems]);

  return null;
}
