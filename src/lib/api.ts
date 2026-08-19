import { Product, ProductsResponse } from "@/types";
import type { CartItem } from "@/types";

const BASE_URL = "https://dummyjson.com";

/**
 * Get all products in a category (e.g. "mens-shirts", "mens-shoes",
 * "mens-watches", "sunglasses").
 */
export async function getProductsByCategory(
  category: string,
): Promise<ProductsResponse> {
  const res = await fetch(`${BASE_URL}/products/category/${category}`, {
    // Use static cache for SSG
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch products for category "${category}" (${res.status})`,
    );
  }

  return res.json();
}

const TOP_RATED_CATEGORY_IDS = [
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "sunglasses",
] as const;

function getHighestRatedProduct(products: Product[]): Product | null {
  if (products.length === 0) {
    return null;
  }

  return products.reduce((best, product) =>
    product.rating > best.rating ? product : best,
  );
}

/** One highest-rated product per category, in shirts → shoes → watches → sunglasses order. */
export async function getTopRatedProductsByCategory(): Promise<Product[]> {
  const results = await Promise.all(
    TOP_RATED_CATEGORY_IDS.map(async (category) => {
      const { products } = await getProductsByCategory(category);
      return getHighestRatedProduct(products);
    }),
  );

  return results.filter((product): product is Product => product !== null);
}

/**
 * Get a single product by id. Returns null if it doesn't exist,
 * so the caller can decide what to do (e.g. call notFound()).
 */
export async function getProductById(
  id: number | string,
): Promise<Product | null> {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    next: { revalidate: 3600 },
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch product ${id} (${res.status})`);
  }

  return res.json();
}

/**
 * Shared mapper: convert raw Supabase cart rows into enriched CartItem[].
 * Used by both the browser-client path (CartAuthSync) and the server-action
 * path (cartAction.ts) so the mapping logic lives in exactly one place.
 */
export async function mapRowsToCartItems(
  rows: { product_id: number; quantity: number }[],
): Promise<CartItem[]> {
  const items = await Promise.all(
    rows.map(async (row): Promise<CartItem | null> => {
      try {
        const product = await getProductById(row.product_id);
        if (!product) return null;
        return {
          id: product.id,
          title: product.title,
          price: product.price,
          description: product.description,
          images: product.images,
          discountPercentage: product.discountPercentage,
          brand: product.brand,
          quantity: row.quantity,
        };
      } catch {
        return null;
      }
    }),
  );
  return items.filter((item): item is CartItem => item !== null);
}

/**
 * Lightweight category fetch that only retrieves product IDs.
 * Used at build time in generateStaticParams to avoid downloading
 * full product payloads just to get the id list.
 */
export async function getProductIdsByCategory(
  category: string,
): Promise<number[]> {
  const res = await fetch(
    `${BASE_URL}/products/category/${category}?select=id`,
    { cache: "force-cache" },
  );
  if (!res.ok) return [];
  const data: { products: { id: number }[] } = await res.json();
  return data.products.map((p) => p.id);
}
