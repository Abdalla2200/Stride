import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createClient } from "@/lib/supabase/client";
import { upsertCartItem, removeCartItem } from "@/actions/cartAction";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  discountPercentage?: number;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: number) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  clearCart: () => void;
  setItems: (items: CartItem[]) => void;
  getTotalPrice: () => number;
  getTotalQuantity: () => number;
};

async function syncIfLoggedIn(productId: number, quantity: number | null) {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) return; // guest — local-only, unchanged behavior

  if (quantity === null) {
    await removeCartItem(productId);
  } else {
    await upsertCartItem({ productId, quantity });
  }
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      checkoutData: null,

      addToCart: (product) => {
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
            return {
              items: [...state.items, { ...product, quantity: 1 }],
            };
          }
        });
        const qty =
          get().items.find((item) => item.id === product.id)?.quantity ?? 1;
        syncIfLoggedIn(product.id, qty);
      },

      increaseQty: (id) => {
        set((state) => {
          return {
            items: state.items.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
            ),
          };
        });
        const qty = get().items.find((item) => item.id === id)?.quantity ?? 1;
        syncIfLoggedIn(id, qty);
      },

      decreaseQty: (id) => {
        set((state) => {
          return {
            items: state.items.map((item) =>
              item.id === id
                ? {
                    ...item,
                    quantity:
                      item.quantity > 0 ? item.quantity - 1 : item.quantity,
                  }
                : item,
            ),
          };
        });
        const qty = get().items.find((item) => item.id === id)?.quantity ?? 1;
        syncIfLoggedIn(id, qty);
      },

      removeFromCart: (id) => {
        set((state) => {
          return {
            items: state.items.filter((item) => item.id !== id),
          };
        });
        syncIfLoggedIn(id, null);
      },

      clearCart: () => set({ items: [] }),

      setItems: (items) => set({ items }),

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
    },
  ),
);
