import { TrendingUp, TrendingDown, Info } from "lucide-react";
import { StatsCardProps } from "../utils/types";
import { useState } from "react";

export function StatsCard({ title, value, change }: StatsCardProps) {
  const isPositive = change > 0;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative rounded-2xl bg-white px-6 py-4 border border-black/10">
      <div className="space-y-1">
        <div className="flex items-center gap-1">
          <p className="text-[15px] font-medium text-gray-600">{title}</p>
          <div
            className="relative flex items-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Info className="h-4 w-4 text-gray-400 cursor-pointer" />
            {isHovered && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-800 px-3 py-1 text-xs text-white shadow-lg">
                {title} stats over the past period
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-2xl font-semibold">
            {new Intl.NumberFormat().format(value)}
          </p>
          <div
            className={`flex items-center gap-0.5 rounded-full px-2 py-0.5 text-sm font-medium ${
              isPositive
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            <span>{`${isPositive ? "+" : "-"}${Math.abs(change)}%`}</span>
            {isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
