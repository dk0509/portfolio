"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Chapter } from "@/components/ui/Chapter";
import { principles } from "@/data/content";
import { useExperience } from "@/components/providers/ExperienceProvider";

export function Philosophy() {
  const { reduceMotion } = useExperience();

  return (
    <Chapter
      id="principles"
      className="py-20 md:py-32"
      atmosphere="bg-[radial-gradient(ellipse_at_center,rgba(110,168,255,0.05),transparent_55%)]"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading
          number="04 — Engineering Principles"
          title="How I decide what to build."
          subtitle="Short principles. Production judgment. No slogans."
        />

        <div className="relative">
          <div className="absolute top-0 bottom-0 left-0 hidden w-px bg-gradient-to-b from-[var(--accent)]/40 via-white/10 to-transparent md:block" />
          <div className="space-y-0 md:pl-10">
            {principles.map((p, i) => (
              <motion.article
                key={p.id}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: reduceMotion ? 0 : i * 0.03, duration: 0.4 }}
                className="group border-b border-white/[0.06] py-7 md:py-8"
              >
                <div className="grid gap-3 md:grid-cols-12 md:items-baseline md:gap-8">
                  <p className="font-mono text-[10px] tracking-[0.25em] text-[var(--fg-dim)] md:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-display text-2xl tracking-tight text-[var(--fg)] transition group-hover:text-[var(--accent)] md:col-span-4 md:text-3xl">
                    {p.principle}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--fg-muted)] md:col-span-7 md:text-base">
                    {p.detail}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </Chapter>
  );
}
