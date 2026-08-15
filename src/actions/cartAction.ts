"use server";

import { z } from "zod";
import { createClient } from "../lib/supabase/server";
import { getProductById } from "@/lib/api";
import type { CartItem } from "../store/cartStore";

const cartItemSchema = z.object({
  productId: z.number().int().positive(),
  quantity: z.number().int().positive(),
});

type ActionResult =
  | { status: "success" }
  | { status: "error"; message: string };

export async function upsertCartItem(input: {
  productId: number;
  quantity: number;
}): Promise<ActionResult> {
  const parsed = cartItemSchema.safeParse(input);
  if (!parsed.success) {
    return { status: "error", message: "Invalid cart item." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { status: "error", message: "You must be signed in." };
  }

  const { error } = await supabase.from("cart_items").upsert(
    {
      user_id: user.id,
      product_id: parsed.data.productId,
      quantity: parsed.data.quantity,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,product_id" },
  );

  if (error) {
    return { status: "error", message: error.message };
  }

  return { status: "success" };
}

export async function removeCartItem(productId: number): Promise<ActionResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { status: "error", message: "You must be signed in." };
  }

  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", user.id)
    .eq("product_id", productId);

  if (error) {
    return { status: "error", message: error.message };
  }

  return { status: "success" };
}

export async function fetchCartItems(): Promise<CartItem[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data: rows } = await supabase
    .from("cart_items")
    .select("product_id, quantity")
    .eq("user_id", user.id);

  if (!rows) return [];

  const items = await Promise.all(
    rows.map(async (row): Promise<CartItem | null> => {
      const product = await getProductById(row.product_id);
      if (!product) return null;

      return {
        id: product.id,
        title: product.title,
        price: product.price,
        description: product.description,
        images: product.images,
        discountPercentage: product.discountPercentage,
        quantity: row.quantity,
      };
    }),
  );

  return items.filter((item): item is CartItem => item !== null);
}

export async function mergeGuestCart(
  guestItems: { productId: number; quantity: number }[],
): Promise<ActionResult> {
  if (guestItems.length === 0) return { status: "success" };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { status: "error", message: "You must be signed in." };

  const { data: existingRows } = await supabase
    .from("cart_items")
    .select("product_id, quantity")
    .eq("user_id", user.id);

  const existingMap = new Map(
    (existingRows ?? []).map((r) => [r.product_id, r.quantity]),
  );

  const mergedRows = guestItems.map((item) => ({
    user_id: user.id,
    product_id: item.productId,
    quantity: (existingMap.get(item.productId) ?? 0) + item.quantity,
    updated_at: new Date().toISOString(),
  }));

  const { error } = await supabase
    .from("cart_items")
    .upsert(mergedRows, { onConflict: "user_id,product_id" });

  return error
    ? { status: "error", message: error.message }
    : { status: "success" };
}
