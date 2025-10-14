import { cn } from "@/lib/utils";
import React from "react";
//import Marquee from "react-fast-marquee";

export default function MarqueeWrapper({
  className ,
  reverse = false, // true = scrolls right, false = left
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}) {

  // Handle direction and hover pause
  const directionClass = reverse ? "direction-reverse" : "";
  const pauseClass = pauseOnHover ? "group-hover:[animation-play-state:paused]" : "";

  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:20s] [--gap:1rem] [gap:var(--gap)]",
        vertical ? "flex-col" : "flex-row",
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around [gap:var(--gap)]", 
              vertical ? "flex-col animate-marquee-vertical" : "flex-row animate-marquee",
              directionClass,
              pauseClass
            )}
            style={{ animationDuration: "var(--duration)" }}
          >
            {children}
          </div>
        ))}
    </div>
  );
}

