"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Chapter } from "@/components/ui/Chapter";
import { architectureEdges, architectureNodes, requestFlows } from "@/data/content";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { cn } from "@/lib/utils";

const kindColor: Record<string, string> = {
  edge: "border-sky-400/40 bg-sky-400/10",
  core: "border-[var(--accent)]/50 bg-[var(--accent)]/15",
  service: "border-violet-400/40 bg-violet-400/10",
  worker: "border-amber-300/35 bg-amber-300/10",
  data: "border-emerald-400/40 bg-emerald-400/10",
  ai: "border-fuchsia-400/35 bg-fuchsia-400/10",
};

export function Architecture() {
  const [active, setActive] = useState("api");
  const [flowIdx, setFlowIdx] = useState(0);
  const [hop, setHop] = useState(0);
  const [cachePulse, setCachePulse] = useState(false);
  const [queueDepth, setQueueDepth] = useState(3);
  const node = architectureNodes.find((n) => n.id === active) ?? architectureNodes[0];
  const flow = requestFlows[flowIdx];
  const { reduceMotion } = useExperience();

  useEffect(() => {
    if (reduceMotion) return;
    const hopTimer = setInterval(() => {
      setHop((h) => {
        const next = h + 1;
        if (next >= flow.path.length) {
          setFlowIdx((f) => (f + 1) % requestFlows.length);
          return 0;
        }
        return next;
      });
    }, 700);
    return () => clearInterval(hopTimer);
  }, [flow.path.length, reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => {
      setCachePulse((v) => !v);
      setQueueDepth((d) => (d % 6) + 1);
    }, 1200);
    return () => clearInterval(id);
  }, [reduceMotion]);

  const hotEdge = useMemo(() => {
    if (hop <= 0) return null;
    return `${flow.path[hop - 1]}>${flow.path[hop]}`;
  }, [flow.path, hop]);

  const hotNode = flow.path[hop];

  const lines = useMemo(() => {
    return architectureEdges
      .map(([from, to]) => {
        const a = architectureNodes.find((n) => n.id === from);
        const b = architectureNodes.find((n) => n.id === to);
        if (!a || !b) return null;
        return { from, to, a, b, key: `${from}>${to}` };
      })
      .filter(Boolean) as Array<{
      from: string;
      to: string;
      a: (typeof architectureNodes)[number];
      b: (typeof architectureNodes)[number];
      key: string;
    }>;
  }, []);

  return (
    <Chapter
      id="architecture"
      className="py-20 md:py-32"
      atmosphere="bg-[radial-gradient(ellipse_at_bottom,rgba(139,124,255,0.06),transparent_50%)]"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading
          number="03 — Architecture Lab"
          title="How production backends connect."
          subtitle="Auth, cache, workers, storage, and AI retrieval — click a node to see why it exists."
        />

        <div className="mb-4 flex flex-wrap gap-2">
          {requestFlows.map((f, i) => (
            <button
              key={f.name}
              type="button"
              onClick={() => {
                setFlowIdx(i);
                setHop(0);
              }}
              className={cn(
                "rounded-full px-3 py-1.5 font-mono text-[10px] tracking-wide",
                flowIdx === i ? "bg-[var(--accent)]/20 text-[var(--fg)]" : "border border-white/10 text-[var(--fg-dim)]",
              )}
            >
              {f.name}
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="glass glow-border relative min-h-[480px] overflow-hidden rounded-3xl sm:min-h-[520px] lg:col-span-8">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(110,168,255,0.1),transparent_50%)]" />
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {lines.map((line) => {
                const hot = hotEdge === line.key;
                return (
                  <g key={line.key}>
                    <line
                      x1={line.a.x}
                      y1={line.a.y}
                      x2={line.b.x}
                      y2={line.b.y}
                      stroke={hot ? "rgba(110,168,255,0.85)" : "rgba(255,255,255,0.1)"}
                      strokeWidth={hot ? 0.45 : 0.18}
                      vectorEffect="non-scaling-stroke"
                    />
                    {hot && !reduceMotion && (
                      <circle r="1" fill="rgba(110,168,255,0.95)">
                        <animateMotion
                          dur="0.65s"
                          repeatCount="1"
                          path={`M${line.a.x},${line.a.y} L${line.b.x},${line.b.y}`}
                        />
                      </circle>
                    )}
                  </g>
                );
              })}
            </svg>

            {architectureNodes.map((n) => {
              const isHot = hotNode === n.id;
              const isCache = n.anim === "cache" && cachePulse;
              const isQueue = n.anim === "queue";
              const isWorker = n.anim === "worker" && hop > 0 && flow.path.includes("workers");
              return (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => setActive(n.id)}
                  className={cn(
                    "absolute z-10 max-w-[130px] -translate-x-1/2 -translate-y-1/2 rounded-xl border px-3 py-2 text-left transition-all",
                    kindColor[n.kind],
                    active === n.id || isHot ? "scale-105 shadow-[0_0_30px_var(--glow)]" : "opacity-85 hover:opacity-100",
                    isCache && "ring-2 ring-[var(--accent)]/50",
                    isWorker && !reduceMotion && "animate-pulse",
                  )}
                  style={{ left: `${n.x}%`, top: `${n.y}%` }}
                >
                  <span className="block font-mono text-[10px] leading-tight tracking-wide text-[var(--fg)]">
                    {n.label}
                  </span>
                  {isQueue && (
                    <span className="mt-1 block font-mono text-[8px] text-amber-200/80">depth {queueDepth}</span>
                  )}
                  {n.anim === "cache" && (
                    <span className="mt-1 block font-mono text-[8px] text-sky-200/80">
                      {cachePulse ? "HIT" : "MISS"}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={node.id}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="glass sticky top-28 rounded-3xl p-6"
              >
                <p className="font-mono text-[10px] tracking-[0.25em] text-[var(--accent)] uppercase">
                  Node · {node.kind}
                </p>
                <h3 className="font-display mt-2 text-2xl tracking-tight md:text-3xl">{node.label}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[var(--fg-muted)]">{node.description}</p>
                <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="mb-2 font-mono text-[10px] tracking-wider text-[var(--fg-dim)] uppercase">
                    Why it exists
                  </p>
                  <p className="text-sm leading-relaxed text-[var(--fg)]/90">{node.why}</p>
                </div>

                <div className="mt-6 space-y-2">
                  <p className="font-mono text-[10px] tracking-wider text-[var(--fg-dim)] uppercase">
                    Live flow · {flow.name}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {flow.path.map((id, i) => {
                      const label = architectureNodes.find((n) => n.id === id)?.label ?? id;
                      return (
                        <span
                          key={`${id}-${i}`}
                          className={cn(
                            "rounded-md border px-2 py-1 font-mono text-[9px]",
                            i === hop
                              ? "border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--fg)]"
                              : "border-white/10 text-[var(--fg-dim)]",
                          )}
                        >
                          {label}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Chapter>
  );
}
