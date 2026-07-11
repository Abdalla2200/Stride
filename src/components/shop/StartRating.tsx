import { Star } from "lucide-react";

export default function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-4.5 w-4.5 ${
            i < Math.round(rating)
              ? "fill-accent text-accent"
              : "fill-secondary-bg text-muted"
          }`}
          strokeWidth={0}
        />
      ))}
    </div>
  );
}
