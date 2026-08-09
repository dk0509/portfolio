"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Chapter } from "@/components/ui/Chapter";
import { techEdges, techGroups, techNodes, type TechGroup } from "@/data/content";
import { cn } from "@/lib/utils";

export function TechStack() {
  const [group, setGroup] = useState<TechGroup | "All">("All");
  const [active, setActive] = useState<string | null>("python");

  const visibleNodes = useMemo(
    () => (group === "All" ? techNodes : techNodes.filter((n) => n.group === group)),
    [group],
  );

  const node = techNodes.find((n) => n.id === active) ?? null;

  const relatedSet = useMemo(() => {
    if (!node) return new Set<string>();
    return new Set([node.id, ...node.related]);
  }, [node]);

  const visibleIds = useMemo(() => new Set(visibleNodes.map((n) => n.id)), [visibleNodes]);

  return (
    <Chapter
      id="stack"
      className="py-20 md:py-32"
      atmosphere="bg-[radial-gradient(ellipse_at_right,rgba(110,168,255,0.04),transparent_45%)]"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6 md:px-10">
        <SectionHeading
          number="05 — Engineering Toolkit"
          title="Technologies connected by production use."
          subtitle="Grouped by how they show up in real systems — select a node to see where it was used."
        />

        <div className="scrollbar-none mb-6 flex gap-2 overflow-x-auto pb-1">
          {(["All", ...techGroups] as const).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGroup(g)}
              className={cn(
                "shrink-0 rounded-full px-3.5 py-1.5 font-mono text-[10px] tracking-wide transition",
                group === g
                  ? "bg-[var(--fg)] text-[var(--bg)]"
                  : "border border-white/10 text-[var(--fg-muted)] hover:text-[var(--fg)]",
              )}
            >
              {g}
            </button>
          ))}
        </div>

        <div className="grid gap-5 lg:grid-cols-12">
          <div className="glass glow-border relative min-h-[380px] overflow-hidden rounded-3xl sm:min-h-[420px] lg:col-span-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(110,168,255,0.06),transparent_55%)]" />
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {techEdges.map(([a, b]) => {
                if (!visibleIds.has(a) || !visibleIds.has(b)) return null;
                const na = techNodes.find((n) => n.id === a);
                const nb = techNodes.find((n) => n.id === b);
                if (!na || !nb) return null;
                const lit = relatedSet.has(a) && relatedSet.has(b);
                return (
                  <line
                    key={`${a}-${b}`}
                    x1={na.x}
                    y1={na.y}
                    x2={nb.x}
                    y2={nb.y}
                    stroke={lit ? "rgba(110,168,255,0.5)" : "rgba(255,255,255,0.07)"}
                    strokeWidth={lit ? 0.3 : 0.12}
                    vectorEffect="non-scaling-stroke"
                  />
                );
              })}
            </svg>

            {visibleNodes.map((n) => {
              const lit = !active || relatedSet.has(n.id);
              const isActive = active === n.id;
              return (
                <button
                  key={n.id}
                  type="button"
                  onMouseEnter={() => setActive(n.id)}
                  onFocus={() => setActive(n.id)}
                  onClick={() => setActive(n.id)}
                  className={cn(
                    "absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-2.5 py-1 font-mono text-[9px] tracking-wide transition-all sm:px-3 sm:py-1.5 sm:text-[10px]",
                    isActive
                      ? "z-10 scale-105 border-[var(--accent)] bg-[var(--accent)]/20 text-[var(--fg)] shadow-[0_0_20px_var(--glow)]"
                      : lit
                        ? "border-white/15 bg-black/50 text-[var(--fg)]"
                        : "border-white/5 bg-black/30 text-white/25",
                  )}
                  style={{ left: `${n.x}%`, top: `${n.y}%` }}
                >
                  {n.name}
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-4">
            <AnimatePresence mode="wait">
              {node ? (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="glass rounded-3xl border border-white/10 p-6 lg:sticky lg:top-28"
                >
                  <p className="font-mono text-[10px] tracking-[0.25em] text-[var(--accent)] uppercase">
                    {node.group}
                  </p>
                  <h3 className="font-display mt-2 text-2xl tracking-tight sm:text-3xl">{node.name}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--fg-muted)]">{node.experience}</p>

                  <div className="mt-6">
                    <p className="mb-2 font-mono text-[10px] tracking-wider text-[var(--fg-dim)] uppercase">
                      Where it was used
                    </p>
                    <ul className="space-y-2">
                      {node.usedIn.map((u) => (
                        <li key={u} className="text-sm text-[var(--fg)]/90">
                          {u}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6">
                    <p className="mb-2 font-mono text-[10px] tracking-wider text-[var(--fg-dim)] uppercase">
                      Related
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {node.related.map((r) => {
                        const related = techNodes.find((t) => t.id === r);
                        if (!related) return null;
                        return (
                          <button
                            key={r}
                            type="button"
                            onClick={() => {
                              setGroup("All");
                              setActive(r);
                            }}
                            className="rounded-full border border-white/10 px-3 py-1 text-xs text-[var(--fg-muted)] hover:border-[var(--accent)]/40 hover:text-[var(--fg)]"
                          >
                            {related.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Chapter>
  );
}
