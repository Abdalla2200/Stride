/**
 * Format a number as a USD price string, e.g. 29.99 → "$29.99".
 */
export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

/**
 * Clamp discount to [0, 100] and compute the discounted price.
 * Returns the original price when there is no discount.
 */
export function getSalePrice(price: number, discountPercentage: number): number {
  const clamped = Math.min(Math.max(discountPercentage, 0), 100);
  if (clamped <= 0) return price;
  return price * (1 - clamped / 100);
}

/**
 * Total discount amount saved across a quantity of items.
 * e.g. price=100, qty=2, discount=10 → 20.
 */
export function getDiscountAmount(
  price: number,
  quantity: number,
  discountPercentage: number,
): number {
  const clamped = Math.min(Math.max(discountPercentage, 0), 100);
  return price * quantity * (clamped / 100);
}
