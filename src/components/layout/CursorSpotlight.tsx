"use client";

import { useEffect } from "react";
import { useExperience } from "@/components/providers/ExperienceProvider";

export function CursorSpotlight() {
  const { reduceMotion } = useExperience();

  useEffect(() => {
    if (reduceMotion) return;
    const root = document.documentElement;
    const onMove = (e: MouseEvent) => {
      root.style.setProperty("--spot-x", `${e.clientX}px`);
      root.style.setProperty("--spot-y", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduceMotion]);

  if (reduceMotion) return null;
  return <div className="spotlight hidden md:block" aria-hidden />;
}
