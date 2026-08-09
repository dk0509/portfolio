"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Chapter } from "@/components/ui/Chapter";
import { currentlyExploring } from "@/data/content";
import { useExperience } from "@/components/providers/ExperienceProvider";

export function CurrentFocus() {
  const { reduceMotion } = useExperience();

  return (
    <Chapter
      id="focus"
      className="py-20 md:py-32"
      atmosphere="bg-[radial-gradient(ellipse_at_right,rgba(94,228,168,0.05),transparent_45%)]"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading
          number="07 — Current Focus"
          title="Currently exploring."
          subtitle="Areas I'm deepening alongside production work."
        />

        <div className="grid gap-3 md:grid-cols-2">
          {currentlyExploring.map((item, i) => (
            <motion.article
              key={item.title}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: reduceMotion ? 0 : i * 0.05, duration: 0.4 }}
              className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 transition hover:border-white/15 hover:bg-white/[0.04] md:p-7"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-xl tracking-tight text-[var(--fg)] md:text-2xl">
                  {item.title}
                </h3>
                <span className="font-mono text-[10px] tracking-wider text-[var(--fg-dim)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[var(--fg-muted)]">{item.detail}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </Chapter>
  );
}
