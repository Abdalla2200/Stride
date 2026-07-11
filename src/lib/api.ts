import { Product, ProductsResponse } from "@/types";

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
