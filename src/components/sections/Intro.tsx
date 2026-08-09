"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, FileText, Mail } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { missionBrief, site } from "@/data/content";
import { useExperience } from "@/components/providers/ExperienceProvider";

const snippets = [
  "async def migrate(batch):",
  "cache.set(key, payload, ttl)",
  "queue.enqueue(ingest_doc)",
  "SELECT … WHERE tenant_id = ?",
];

export function Intro() {
  const sectionRef = useRef<HTMLElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 80, damping: 22 });
  const sy = useSpring(my, { stiffness: 80, damping: 22 });
  const glowX = useTransform(sx, [0, 1], ["22%", "78%"]);
  const glowY = useTransform(sy, [0, 1], ["18%", "68%"]);
  const [typed, setTyped] = useState(0);
  const { reduceMotion } = useExperience();
  const lines = missionBrief.lines;

  useEffect(() => {
    if (reduceMotion) {
      setTyped(lines.length);
      return;
    }
    const id = setInterval(() => setTyped((t) => (t >= lines.length ? t : t + 1)), 360);
    return () => clearInterval(id);
  }, [reduceMotion, lines.length]);

  const onMove = (e: React.PointerEvent) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <section
      id="intro"
      ref={sectionRef}
      onPointerMove={onMove}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-20 pb-14"
    >
      <div className="aurora opacity-80" />
      <div className="grid-floor absolute inset-0 opacity-60" />
      <motion.div
        className="pointer-events-none absolute h-[50vw] w-[50vw] max-w-[640px] rounded-full opacity-60 blur-[100px]"
        style={{
          left: glowX,
          top: glowY,
          x: "-50%",
          y: "-50%",
          background:
            "radial-gradient(circle, rgba(110,168,255,0.24) 0%, rgba(139,124,255,0.1) 40%, transparent 70%)",
        }}
      />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {snippets.map((s, i) => (
          <motion.span
            key={s}
            className="absolute font-mono text-[10px] text-white/12 sm:text-xs"
            style={{ left: `${10 + (i % 2) * 45}%`, top: `${22 + i * 16}%` }}
            animate={reduceMotion ? { opacity: 0.12 } : { opacity: [0.08, 0.18, 0.08] }}
            transition={reduceMotion ? undefined : { duration: 9 + i, repeat: Infinity, ease: "easeInOut" }}
          >
            {s}
          </motion.span>
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 font-mono text-[11px] tracking-[0.3em] text-[var(--accent)] uppercase"
        >
          {missionBrief.eyebrow}
        </motion.p>

        <h1 className="font-display max-w-4xl text-[clamp(2.35rem,7.5vmin,5.25rem)] leading-[0.94] tracking-[-0.04em]">
          {lines.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "110%", opacity: 0 }}
                animate={typed > i ? { y: "0%", opacity: 1 } : {}}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className={i === lines.length - 1 ? "text-[var(--accent)]" : "text-[var(--fg)]"}>
                  {line}
                </span>
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduceMotion ? 0 : 1.35 }}
          className="mt-6 max-w-2xl text-sm leading-relaxed text-[var(--fg-muted)] md:mt-7 md:text-base md:leading-7"
        >
          {missionBrief.statement}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduceMotion ? 0 : 1.5 }}
          className="mt-5 flex flex-wrap gap-2"
        >
          {missionBrief.signals.map((s) => (
            <span
              key={s}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[10px] tracking-wide text-[var(--fg-muted)]"
            >
              {s}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduceMotion ? 0 : 1.65 }}
          className="mt-8 flex flex-wrap gap-2.5 md:mt-9"
        >
          <MagneticButton variant="primary" onClick={() => scrollTo("journey")}>
            Engineering Journey
          </MagneticButton>
          <MagneticButton onClick={() => scrollTo("architecture")}>
            Architecture Lab
            <ArrowUpRight className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton href={site.resume} target="_blank" rel="noopener noreferrer">
            <FileText className="h-4 w-4" />
            Resume
          </MagneticButton>
          <MagneticButton href={site.links.github} target="_blank" rel="noopener noreferrer">
            <GitHubIcon className="h-4 w-4" />
            GitHub
          </MagneticButton>
          <MagneticButton onClick={() => scrollTo("contact")}>
            <Mail className="h-4 w-4" />
            Contact
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
