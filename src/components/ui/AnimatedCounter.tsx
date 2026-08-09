"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { formatCompact } from "@/lib/utils";

export function AnimatedCounter({
  value,
  suffix = "",
  compact = false,
}: {
  value: number;
  suffix?: string;
  compact?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(value * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  const label = compact ? formatCompact(display) : display.toLocaleString();

  return (
    <span ref={ref} className="tabular-nums">
      {label}
      {suffix}
    </span>
  );
}
