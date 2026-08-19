import { Star } from "lucide-react";

export default function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-4.5 w-4.5 ${
            i < Math.round(rating)
              ? "fill-gold text-gold"
              : "fill-secondary-bg text-dim"
          }`}
          strokeWidth={0}
        />
      ))}
    </div>
  );
}
