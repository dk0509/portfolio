"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { commandItems, site } from "@/data/content";
import { useExperience } from "@/components/providers/ExperienceProvider";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function CommandPalette() {
  const { commandOpen, setCommandOpen, toggleRecruiterMode, setTerminalOpen } = useExperience();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commandItems;
    return commandItems.filter(
      (i) => i.label.toLowerCase().includes(q) || i.hint.toLowerCase().includes(q) || i.group.toLowerCase().includes(q),
    );
  }, [query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen(!commandOpen);
      }
      if (e.key === "Escape") setCommandOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [commandOpen, setCommandOpen]);

  useEffect(() => {
    if (commandOpen) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [commandOpen]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-cmd-index="${active}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const run = (item: (typeof commandItems)[number]) => {
    setCommandOpen(false);
    if (item.action === "resume") {
      window.open(site.resume, "_blank", "noopener,noreferrer");
      return;
    }
    if (item.action === "github") {
      window.open(site.links.github, "_blank", "noopener,noreferrer");
      return;
    }
    if (item.action === "recruiter") {
      toggleRecruiterMode();
      return;
    }
    if (item.action === "terminal") {
      setTerminalOpen(true);
      return;
    }
    scrollToId(item.id);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && filtered[active]) {
      e.preventDefault();
      run(filtered[active]);
    }
  };

  return (
    <AnimatePresence>
      {commandOpen && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center bg-black/60 px-4 pt-[10vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setCommandOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-label="Command palette"
            className="glass glow-border flex max-h-[min(560px,72vh)] w-full max-w-lg flex-col overflow-hidden rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="shrink-0 border-b border-white/10 px-4 py-3">
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Jump to a chapter, open resume, toggle recruiter mode…"
                className="w-full bg-transparent text-sm text-[var(--fg)] outline-none placeholder:text-[var(--fg-dim)]"
              />
            </div>

            <ul
              ref={listRef}
              data-lenis-prevent
              onWheel={(e) => e.stopPropagation()}
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain py-2"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {filtered.length === 0 && (
                <li className="px-4 py-6 text-center text-sm text-[var(--fg-dim)]">No matches</li>
              )}
              {filtered.map((item, i) => {
                const showGroup =
                  i === 0 || filtered[i - 1]?.group !== item.group;
                return (
                  <li key={`${item.group}-${item.id}-${i}`}>
                    {showGroup && (
                      <p className="px-4 pt-3 pb-1 font-mono text-[9px] tracking-[0.2em] text-[var(--fg-dim)] uppercase">
                        {item.group}
                      </p>
                    )}
                    <button
                      type="button"
                      data-cmd-index={i}
                      onMouseEnter={() => setActive(i)}
                      onClick={() => run(item)}
                      className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm ${
                        i === active ? "bg-white/[0.07] text-[var(--fg)]" : "text-[var(--fg-muted)]"
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className="font-mono text-[10px] text-[var(--fg-dim)]">{item.hint}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="flex shrink-0 justify-between border-t border-white/10 px-4 py-2 font-mono text-[10px] text-[var(--fg-dim)]">
              <span>↑↓ navigate · ↵ select · esc close</span>
              <span>Scroll for Actions · ⌘K</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
