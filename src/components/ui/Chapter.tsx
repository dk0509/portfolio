"use client";

import { motion } from "framer-motion";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { chapterBridges } from "@/data/content";

type Props = {
  id: keyof typeof chapterBridges;
  children: React.ReactNode;
  className?: string;
  atmosphere?: string;
};

export function Chapter({ id, children, className, atmosphere }: Props) {
  const { reduceMotion, recruiterMode } = useExperience();
  const bridge = chapterBridges[id];

  return (
    <section id={id} className={`relative ${className ?? ""}`}>
      {atmosphere && <div className={`pointer-events-none absolute inset-0 ${atmosphere}`} aria-hidden />}
      {!recruiterMode && (
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.5 }}
          className="relative z-10 mx-auto max-w-6xl px-5 pt-8 font-mono text-[10px] tracking-[0.28em] text-[var(--fg-dim)] uppercase sm:px-6 md:px-10"
        >
          Chapter · {bridge}
        </motion.p>
      )}
      <div className="relative z-10">{children}</div>
    </section>
  );
}
