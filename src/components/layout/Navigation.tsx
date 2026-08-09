"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navItems, site } from "@/data/content";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [active, setActive] = useState("intro");
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const { recruiterMode, reduceMotion } = useExperience();

  const items = useMemo(
    () => (recruiterMode ? navItems.filter((n) => n.recruiter) : navItems),
    [recruiterMode],
  );

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY.current && y > 120);
      lastY.current = y;

      const sections = navItems.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
      for (let i = sections.length - 1; i >= 0; i--) {
        if (y + 140 >= sections[i].offsetTop) {
          setActive(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!recruiterMode) return;
    document.getElementById("journey")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  }, [recruiterMode]); // eslint-disable-line react-hooks/exhaustive-deps

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    setOpen(false);
  };

  return (
    <>
      <motion.header
        className="fixed top-5 right-0 left-0 z-[55] flex justify-center px-4"
        animate={{ y: hidden && !open ? -100 : 0, opacity: hidden && !open ? 0 : 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav className="glass glow-border flex max-w-[980px] items-center gap-1 rounded-full px-2 py-1.5 shadow-[0_8px_40px_rgba(0,0,0,0.45)]">
          <button
            type="button"
            onClick={() => scrollTo("intro")}
            className="font-display mr-1 rounded-full px-3 py-2 text-sm tracking-tight text-[var(--fg)]"
          >
            DA
          </button>

          <div className="hidden items-center gap-0.5 lg:flex">
            {items.slice(recruiterMode ? 0 : 1).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollTo(item.id)}
                className={cn(
                  "relative rounded-full px-3 py-2 font-mono text-[11px] tracking-wide transition-colors",
                  active === item.id ? "text-[var(--fg)]" : "text-[var(--fg-muted)] hover:text-[var(--fg)]",
                )}
              >
                {active === item.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/[0.06]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}
          </div>

          {recruiterMode && (
            <a
              href={site.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 hidden rounded-full bg-[var(--fg)] px-3 py-2 font-mono text-[10px] text-[var(--bg)] md:inline-flex"
            >
              Resume
            </a>
          )}

          <button
            type="button"
            className="rounded-full px-3 py-2 font-mono text-[11px] text-[var(--fg-muted)] lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle navigation"
          >
            Menu
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="glass fixed inset-x-4 top-20 z-[54] rounded-2xl p-4 lg:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <div className="flex flex-col gap-1">
              {items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-left hover:bg-white/[0.04]"
                >
                  <span className="font-mono text-[10px] text-[var(--accent)]">{item.number}</span>
                  <span className="text-sm">{item.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed top-1/2 right-3 z-[50] hidden -translate-y-1/2 flex-col items-end gap-1.5 xl:flex" aria-hidden>
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollTo(item.id)}
            className="group flex items-center justify-end gap-1.5 py-0.5"
            aria-label={item.label}
          >
            <span className="font-mono text-[8px] tracking-wider text-white/25 opacity-0 transition duration-200 group-hover:opacity-100">
              {item.number}
            </span>
            <span
              className={cn(
                "w-px rounded-full transition-all duration-300",
                active === item.id
                  ? "h-3.5 bg-[var(--accent)]/70"
                  : "h-2 bg-white/15 group-hover:bg-white/35",
              )}
            />
          </button>
        ))}
      </div>
    </>
  );
}
