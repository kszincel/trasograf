"use client";

import { KRAKOW_ROUTE } from "@/lib/krakow-route";

interface RouteShapeProps {
  className?: string;
  strokeColor?: string;
  strokeWidth?: number;
  size?: "sm" | "md" | "lg" | "full";
}

const sizeMap = {
  sm: "w-32 h-44",
  md: "w-48 h-64",
  lg: "w-64 h-80",
  full: "w-full h-full",
};

export function RouteShape({
  className = "",
  strokeColor = "currentColor",
  strokeWidth = 2,
  size = "md",
}: RouteShapeProps) {
  return (
    <svg
      viewBox={KRAKOW_ROUTE.viewBox}
      className={`${sizeMap[size]} ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Trasa 23. Maratonu Krakowskiego"
    >
      <path
        d={KRAKOW_ROUTE.pathSimple}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
