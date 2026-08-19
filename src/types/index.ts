export interface ProductReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  tags: string[];
  thumbnail: string;
  images: string[];
  reviews?: ProductReview[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

/**
 * A cart item is a subset of Product fields the cart actually needs,
 * plus a quantity. Defined here (not in cartStore) to avoid circular
 * imports between lib/api → cartStore → lib/api.
 */
export type CartItem = Pick<
  Product,
  "id" | "title" | "price" | "description" | "images" | "discountPercentage" | "brand"
> & {
  quantity: number;
};
