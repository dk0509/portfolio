"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Chapter } from "@/components/ui/Chapter";
import { journey } from "@/data/content";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { cn } from "@/lib/utils";

const fields = [
  { key: "mission", label: "Mission" },
  { key: "challenge", label: "Challenge" },
  { key: "engineeringWork", label: "Engineering Work" },
  { key: "result", label: "Result" },
] as const;

export function Journey() {
  const [active, setActive] = useState(0);
  const chapter = journey[active];
  const { reduceMotion } = useExperience();

  return (
    <Chapter
      id="journey"
      className="py-20 md:py-32"
      atmosphere="bg-[radial-gradient(ellipse_at_left,rgba(139,124,255,0.05),transparent_50%)]"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6 md:px-10">
        <SectionHeading
          number="01 — Engineering Journey"
          title="Ownership that compounds."
          subtitle="Learning production engineering → building enterprise software → scaling enterprise systems."
        />

        <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-1 sm:mb-8">
          {journey.map((m, i) => (
            <div key={m.id} className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  "rounded-full px-3.5 py-2 font-mono text-[10px] tracking-wide transition sm:text-[11px]",
                  active === i ? "bg-[var(--fg)] text-[var(--bg)]" : "border border-white/10 text-[var(--fg-muted)]",
                )}
              >
                {m.number}
              </button>
              {i < journey.length - 1 && (
                <span className="hidden font-mono text-[10px] text-white/20 sm:inline" aria-hidden>
                  →
                </span>
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={chapter.id}
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="grid gap-5 lg:grid-cols-12 lg:gap-6"
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-7 lg:col-span-5 md:p-9">
              <p className="font-mono text-[11px] tracking-[0.28em] text-[var(--accent)] uppercase">
                {chapter.number}
              </p>
              <h3 className="font-display mt-4 text-2xl tracking-tight sm:text-3xl md:text-4xl">
                {chapter.title}
              </h3>
              <p className="mt-4 text-sm text-[var(--fg-muted)]">
                {chapter.role} · {chapter.company}
              </p>
              <p className="mt-1 font-mono text-[10px] tracking-wider text-[var(--fg-dim)] uppercase">
                {chapter.period} · {chapter.location}
              </p>
            </div>

            <div className="space-y-3 lg:col-span-7">
              {fields.map((f, i) => (
                <motion.div
                  key={f.key}
                  initial={reduceMotion ? false : { opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: reduceMotion ? 0 : 0.04 * i }}
                  className="rounded-2xl border border-white/[0.07] bg-black/20 p-5"
                >
                  <p className="mb-2 font-mono text-[10px] tracking-[0.22em] text-[var(--accent)] uppercase">
                    {f.label}
                  </p>
                  <p className="text-sm leading-relaxed text-[var(--fg-muted)] md:text-[15px] md:leading-7">
                    {chapter[f.key]}
                  </p>
                </motion.div>
              ))}

              <div className="rounded-2xl border border-dashed border-white/12 p-5">
                <p className="mb-3 font-mono text-[10px] tracking-[0.22em] text-[var(--fg-dim)] uppercase">
                  Lessons Learned
                </p>
                <ul className="space-y-2.5">
                  {chapter.lessons.map((l) => (
                    <li key={l} className="flex gap-3 text-sm leading-relaxed text-[var(--fg)]/90">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--violet)]" />
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Chapter>
  );
}
