"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Chapter } from "@/components/ui/Chapter";
import { impactMetrics, impactTags } from "@/data/content";
import { useExperience } from "@/components/providers/ExperienceProvider";

export function Impact() {
  const { reduceMotion } = useExperience();

  return (
    <Chapter
      id="impact"
      className="overflow-hidden py-20 md:py-32"
      atmosphere="bg-[radial-gradient(ellipse_at_center,rgba(110,168,255,0.06),transparent_55%)]"
    >
      <div className="relative mx-auto max-w-6xl px-5 sm:px-6 md:px-10">
        <SectionHeading
          number="06 — Impact"
          title="Outcomes from production work."
          subtitle="Migrations, integrity, and depth — measured where the resume is specific."
        />

        <div className="grid gap-4 sm:grid-cols-3">
          {impactMetrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: reduceMotion ? 0 : i * 0.06, duration: 0.4 }}
              className="glass glow-border rounded-3xl p-6 md:p-7"
            >
              <p className="font-display text-4xl tracking-tight text-[var(--fg)] md:text-5xl">
                <AnimatedCounter value={m.value} suffix={m.suffix} compact={m.value >= 1000} />
              </p>
              <p className="mt-3 text-sm font-medium text-[var(--fg)]">{m.label}</p>
              <p className="mt-1 font-mono text-[10px] tracking-wider text-[var(--accent)] uppercase">
                {m.detail}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--fg-muted)]">{m.story}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-2.5">
          {impactTags.map((tag, i) => (
            <motion.span
              key={tag}
              initial={reduceMotion ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: reduceMotion ? 0 : 0.02 * i }}
              className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-[11px] tracking-wide text-[var(--fg-muted)]"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </Chapter>
  );
}
