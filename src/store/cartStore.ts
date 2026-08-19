import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createClient } from "@/lib/supabase/client";
import { upsertCartItem, removeCartItem } from "@/actions/cartAction";
import type { CartItem } from "@/types";

// Re-export so existing imports like `import { type CartItem } from "@/store/cartStore"`
// continue to work without touching every consumer file.
export type { CartItem } from "@/types";

type CartStore = {
  items: CartItem[];
  /** True once CartAuthSync has completed its first server fetch. */
  synced: boolean;
  /** Returns a Promise so callers can await sync completion and handle errors. */
  addToCart: (product: Omit<CartItem, "quantity">) => Promise<void>;
  removeFromCart: (id: number) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  clearCart: () => void;
  setItems: (items: CartItem[]) => void;
  setSynced: (value: boolean) => void;
  getTotalPrice: () => number;
  getTotalQuantity: () => number;
};

/**
 * Fire-and-forget sync for guest→server. Throws on Supabase error so
 * callers that care (e.g. AddToCartBtn) can surface the failure.
 */
async function syncIfLoggedIn(
  productId: number,
  quantity: number | null,
): Promise<void> {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) return; // guest — local-only, unchanged behavior

  const result =
    quantity === null
      ? await removeCartItem(productId)
      : await upsertCartItem({ productId, quantity });

  if (result.status === "error") {
    throw new Error(result.message);
  }
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      synced: false,

      addToCart: async (product) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => product.id === item.id,
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          } else {
            // Explicitly pick only CartItem fields — avoids persisting stray
            // Product fields (category, rating, stock, tags, thumbnail, etc.)
            return {
              items: [
                ...state.items,
                {
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  description: product.description,
                  images: product.images,
                  discountPercentage: product.discountPercentage,
                  brand: product.brand,
                  quantity: 1,
                },
              ],
            };
          }
        });

        const qty =
          get().items.find((item) => item.id === product.id)?.quantity ?? 1;
        // Await so AddToCartBtn can catch sync failures.
        await syncIfLoggedIn(product.id, qty);
      },

      increaseQty: (id) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        }));
        const qty = get().items.find((item) => item.id === id)?.quantity ?? 1;
        // Fire-and-forget — optimistic UI is already updated above.
        syncIfLoggedIn(id, qty);
      },

      decreaseQty: (id) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity:
                    item.quantity > 0 ? item.quantity - 1 : item.quantity,
                }
              : item,
          ),
        }));
        const qty = get().items.find((item) => item.id === id)?.quantity ?? 1;
        syncIfLoggedIn(id, qty);
      },

      removeFromCart: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
        syncIfLoggedIn(id, null);
      },

      clearCart: () => set({ items: [] }),

      setItems: (items) => set({ items }),

      setSynced: (value) => set({ synced: value }),

      getTotalQuantity: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),
      getTotalPrice: () =>
        get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        ),
    }),
    {
      name: "cart-storage",
      // `synced` is runtime-only — never persist it. It always starts as false
      // so CartAuthSync must complete a fetch before the cart page renders.
      partialize: (state) => ({ items: state.items }),
      // Skip automatic rehydration on mount. CartAuthSync calls
      // useCartStore.persist.rehydrate() manually for guests only, so that
      // a logged-in user's server data is never overwritten by stale
      // localStorage values (which was causing the quantity-doubling bug).
      skipHydration: true,
    },
  ),
);
