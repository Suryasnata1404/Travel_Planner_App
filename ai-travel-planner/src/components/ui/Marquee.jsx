// /src/components/ui/Marquee.jsx
import React from "react";
import Marquee from "react-fast-marquee";

export default function MarqueeWrapper({
  children,
  reverse = false,
  speed = 40,
  pauseOnHover = true,
  className = "",
}) {
  return (
    <Marquee
      direction={reverse ? "left" : "right"}
      pauseOnHover={pauseOnHover}
      speed={speed}
      gradient={false}
      className={className}
    >
      {children}
    </Marquee>
  );
}
