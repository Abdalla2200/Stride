export interface CategoryMeta {
  name: string;
  breadcrumb: string;
  description: string;
}

export const categoryIds = [
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "sunglasses",
];

export const CATEGORIES: Record<string, CategoryMeta> = {
  "mens-shirts": {
    name: "Men's Shirts",
    breadcrumb: "Shirts",
    description:
      "From crisp oxfords to relaxed linens — essential shirts crafted for the modern man. Built for boardrooms, weekends, and everything in between.",
  },
  "mens-shoes": {
    name: "Men's Shoes",
    breadcrumb: "Shoes",
    description:
      "Step up your everyday. Premium footwear that balances comfort, durability, and timeless style for the man on the move.",
  },
  "mens-watches": {
    name: "Men's Watches",
    breadcrumb: "Watches",
    description:
      "Timepieces that make a statement. Precision-crafted watches for men who value understated luxury and lasting quality.",
  },
  sunglasses: {
    name: "Sunglasses",
    breadcrumb: "Sunglasses",
    description:
      "Sharp frames for sharper looks. UV-protected eyewear designed to elevate your style from street to shoreline.",
  },
};

export function getCategoryMeta(catId: string): CategoryMeta | null {
  return CATEGORIES[catId] ?? null;
}
