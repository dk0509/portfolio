"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { loaderSteps } from "@/data/content";

export function Loader({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const preferReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (preferReduce) {
      onComplete();
      return;
    }

    const stepInterval = setInterval(() => {
      setStep((s) => Math.min(s + 1, loaderSteps.length - 1));
    }, 520);

    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(progressInterval);
          clearInterval(stepInterval);
          setTimeout(onComplete, 280);
          return 100;
        }
        return p + 2.2;
      });
    }, 36);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030407]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }}
    >
      <div className="aurora opacity-60" />
      <div className="relative z-10 w-full max-w-md px-8">
        <p className="mb-3 font-mono text-[11px] tracking-[0.28em] text-[var(--accent)] uppercase">
          System Boot
        </p>
        <motion.p
          key={step}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display mb-8 text-2xl tracking-tight text-[var(--fg)] sm:text-3xl"
        >
          {loaderSteps[step]}
        </motion.p>
        <div className="h-px w-full overflow-hidden bg-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--violet)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-3 flex justify-between font-mono text-[10px] tracking-widest text-[var(--fg-dim)]">
          <span>DEVANSH.OS</span>
          <span>{Math.min(100, Math.round(progress))}%</span>
        </div>
      </div>
    </motion.div>
  );
}
