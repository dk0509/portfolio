"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const rx = useSpring(rotateX, { stiffness: 180, damping: 20 });
  const ry = useSpring(rotateY, { stiffness: 180, damping: 20 });
  const glow = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, rgba(110,168,255,0.12), transparent 45%)`;

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    mx.set(px);
    my.set(py);
    rotateX.set(((py - rect.height / 2) / rect.height) * -8);
    rotateY.set(((px - rect.width / 2) / rect.width) * 8);
  };

  const onLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", perspective: 1000 }}
      className={cn("relative overflow-hidden rounded-2xl", className)}
    >
      <motion.div className="pointer-events-none absolute inset-0 z-10" style={{ background: glow }} />
      {children}
    </motion.div>
  );
}
