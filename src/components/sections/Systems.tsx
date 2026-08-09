"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Chapter } from "@/components/ui/Chapter";
import { systems } from "@/data/content";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { cn } from "@/lib/utils";

const tabs = [
  "Overview",
  "Problem Solved",
  "My Contribution",
  "Technologies Used",
  "Business Impact",
  "Key Takeaway",
] as const;

export function Systems() {
  const [active, setActive] = useState(systems[0].id);
  const [tab, setTab] = useState<(typeof tabs)[number]>("Overview");
  const system = systems.find((s) => s.id === active) ?? systems[0];
  const { reduceMotion } = useExperience();

  const body = (() => {
    switch (tab) {
      case "Overview":
        return <p>{system.overview}</p>;
      case "Problem Solved":
        return <p>{system.problem}</p>;
      case "My Contribution":
        return (
          <ul className="space-y-3">
            {system.contribution.map((c) => (
              <li key={c} className="flex gap-3">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
                {c}
              </li>
            ))}
          </ul>
        );
      case "Technologies Used":
        return (
          <div className="flex flex-wrap gap-2">
            {system.technologies.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] text-[var(--fg-muted)]"
              >
                {t}
              </span>
            ))}
          </div>
        );
      case "Business Impact":
        return <p>{system.businessImpact}</p>;
      case "Key Takeaway":
        return <p className="text-[var(--fg)]/90">{system.takeaway}</p>;
    }
  })();

  return (
    <Chapter
      id="systems"
      className="py-20 md:py-32"
      atmosphere="bg-[radial-gradient(ellipse_at_top_right,rgba(110,168,255,0.05),transparent_45%)]"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6 md:px-10">
        <SectionHeading
          number="02 — Systems Built"
          title="Systems shaped by real workflows."
          subtitle="Each case study stays close to what shipped — problem, contribution, and impact."
        />

        <div className="mb-8 flex flex-wrap gap-2">
          {systems.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                setActive(s.id);
                setTab("Overview");
              }}
              className={cn(
                "rounded-full px-4 py-2 font-mono text-[11px] tracking-wide transition",
                active === s.id ? "bg-[var(--fg)] text-[var(--bg)]" : "border border-white/10 text-[var(--fg-muted)]",
              )}
            >
              {s.name}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.article
            key={system.id}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden rounded-3xl border border-white/10 bg-[#07090f]"
          >
            <div className="relative border-b border-white/10 px-6 py-10 sm:px-8 md:px-12 md:py-12">
              <div className="absolute inset-0 opacity-40">
                <ArchitectureSketch variant={system.id} />
              </div>
              <div className="relative max-w-2xl">
                <p className="font-mono text-[10px] tracking-[0.28em] text-[var(--accent)] uppercase">
                  Case study
                </p>
                <h3 className="font-display mt-3 text-3xl tracking-tight sm:text-4xl md:text-5xl">
                  {system.name}
                </h3>
                <p className="mt-3 text-[var(--fg-muted)]">{system.tagline}</p>
                <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {system.impact.map((i) => (
                    <div key={i.label} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                      <p className="font-display text-lg">{i.metric}</p>
                      <p className="mt-1 font-mono text-[9px] tracking-wider text-[var(--fg-dim)] uppercase">
                        {i.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6 md:p-8">
              <div className="scrollbar-none mb-6 flex gap-0 overflow-x-auto border-b border-white/[0.06]">
                {tabs.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTab(t)}
                    className={cn(
                      "relative shrink-0 px-3 py-3 text-xs whitespace-nowrap transition md:text-sm",
                      tab === t ? "text-[var(--fg)]" : "text-[var(--fg-dim)] hover:text-[var(--fg-muted)]",
                    )}
                  >
                    {t}
                    {tab === t && (
                      <motion.span
                        layoutId="systems-tab"
                        className="absolute right-3 bottom-0 left-3 h-px bg-[var(--accent)]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="min-h-[100px] text-sm leading-relaxed text-[var(--fg-muted)] md:text-[15px] md:leading-7"
                >
                  {body}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </Chapter>
  );
}

function ArchitectureSketch({ variant }: { variant: string }) {
  return (
    <svg viewBox="0 0 800 280" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="flow2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(110,168,255,0)" />
          <stop offset="50%" stopColor="rgba(110,168,255,0.55)" />
          <stop offset="100%" stopColor="rgba(139,124,255,0)" />
        </linearGradient>
      </defs>
      {[
        [80, 140],
        [240, 80],
        [240, 200],
        [420, 140],
        [600, 90],
        [600, 190],
        [720, 140],
      ].map(([x, y], i) => (
        <rect
          key={i}
          x={x - 48}
          y={y - 22}
          width="96"
          height="44"
          rx="10"
          fill="rgba(3,4,7,0.55)"
          stroke="rgba(255,255,255,0.12)"
        />
      ))}
      <path
        d={
          variant === "inframind-ai"
            ? "M128 140 H192 M240 102 V178 M288 80 H372 M288 200 H372 M468 140 H552 M600 112 V168 M648 90 H672 M648 190 H672"
            : "M128 140 H192 M240 102 V178 M288 140 H372 M468 140 H552 M600 112 V168 M648 140 H672"
        }
        stroke="url(#flow2)"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="8 10"
      >
        <animate attributeName="stroke-dashoffset" values="0;-36" dur="2s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}
