// CartAuthSync.tsx
"use client";

import { useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { useCartStore, type CartItem } from "@/store/cartStore";
import { mergeGuestCart } from "@/actions/cartAction";

/** Events that are noisy re-broadcasts of an unchanged session — safe to skip. */
const SKIP_EVENTS = new Set(["TOKEN_REFRESHED", "USER_UPDATED", "MFA_CHALLENGE_VERIFIED"]);

/**
 * Fetch cart rows using the BROWSER Supabase client (session is already in
 * memory — no cookie round-trip needed), then enrich with product data from
 * the public DummyJSON API.  This avoids the server-action cookie-race that
 * caused an empty cart right after sign-in.
 */
async function fetchCartItemsClient(userId: string): Promise<CartItem[]> {
  const supabase = createClient();

  // Check if we have an active session
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  if (sessionError || !session) {
    // No active session, return empty cart
    return [];
  }

  const { data: rows, error } = await supabase
    .from("cart_items")
    .select("product_id, quantity")
    .eq("user_id", userId);

  if (error || !rows || rows.length === 0) return [];

  const items = await Promise.all(
    rows.map(async (row): Promise<CartItem | null> => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${row.product_id}`);
        if (!res.ok) return null;
        const product = await res.json();
        return {
          id: product.id,
          title: product.title,
          price: product.price,
          description: product.description,
          images: product.images,
          discountPercentage: product.discountPercentage,
          quantity: row.quantity,
        };
      } catch {
        return null;
      }
    }),
  );

  return items.filter((item): item is CartItem => item !== null);
}

export default function CartAuthSync() {
  const setItems = useCartStore((state) => state.setItems);
  const setSynced = useCartStore((state) => state.setSynced);
  const previousUserId = useRef<string | null>(null);
  const hasHydrated = useRef(false);

  useEffect(() => {
    const supabase = createClient();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // Ignore pure token refreshes — session user hasn't actually changed.
        if (SKIP_EVENTS.has(event)) return;

        const currentUserId = session?.user?.id ?? null;

        // ── INITIAL_SESSION ──────────────────────────────────────────────────
        // First firing after mount: hydrate from the DB if a session exists.
        if (!hasHydrated.current) {
          hasHydrated.current = true;
          previousUserId.current = currentUserId;

          if (currentUserId) {
            // Mark as NOT synced while we fetch so the cart shows a skeleton.
            setSynced(false);
            const items = await fetchCartItemsClient(currentUserId);
            setItems(items);
          }
          // Whether we fetched or not, we're now synced.
          setSynced(true);
          return;
        }

        // ── SIGNED_OUT ───────────────────────────────────────────────────────
        if (event === "SIGNED_OUT") {
          previousUserId.current = null;
          setSynced(true);
          return;
        }

        // ── SIGNED_IN ────────────────────────────────────────────────────────
        // The browser client already has the session in memory, so we can query
        // Supabase directly without waiting for any cookie.
        if (event === "SIGNED_IN" && currentUserId) {
          previousUserId.current = currentUserId;

          // Mark as NOT synced — cart page should show skeleton, not empty state.
          setSynced(false);

          // Merge any guest items added while logged out.
          const guestItems = useCartStore.getState().items;
          if (guestItems.length > 0) {
            await mergeGuestCart(
              guestItems.map((item) => ({
                productId: item.id,
                quantity: item.quantity,
              })),
            );
          }

          // Fetch directly via browser client — no cookie race.
          const items = await fetchCartItemsClient(currentUserId);
          setItems(items);
          setSynced(true);
          return;
        }

        // ── Fallback (PASSWORD_RECOVERY, etc.) ───────────────────────────────
        if (currentUserId !== previousUserId.current) {
          previousUserId.current = currentUserId;
          setSynced(false);
          if (currentUserId) {
            const items = await fetchCartItemsClient(currentUserId);
            setItems(items);
          } else {
            setItems([]);
          }
          setSynced(true);
        }
      },
    );

    return () => listener.subscription.unsubscribe();
  }, [setItems, setSynced]);

  return null;
}

