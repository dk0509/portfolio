"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { site } from "@/data/content";

const HELP = [
  "help          list commands",
  "whoami        identity",
  "journey       engineering chapters",
  "systems       case studies",
  "principles    how I think",
  "impact        measured outcomes",
  "focus         currently exploring",
  "resume        open PDF",
  "contact       email",
  "clear         clear screen",
  "exit          close terminal",
];

export function TerminalEgg() {
  const { terminalOpen, setTerminalOpen, setCommandOpen } = useExperience();
  const [lines, setLines] = useState<string[]>([
    "devansh.os terminal — type `help`",
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const konami = useRef<string[]>([]);

  useEffect(() => {
    const seq = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    const onKey = (e: KeyboardEvent) => {
      konami.current = [...konami.current, e.key].slice(-10);
      if (seq.every((k, i) => konami.current[i] === k)) {
        setTerminalOpen(true);
        setLines((l) => [...l, "", "> Konami sequence accepted. Welcome, recruiter of culture."]);
        konami.current = [];
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setTerminalOpen]);

  useEffect(() => {
    if (terminalOpen) setTimeout(() => inputRef.current?.focus(), 50);
  }, [terminalOpen]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [lines, terminalOpen]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    const next = [`$ ${raw}`];
    if (!cmd) {
      setLines((l) => [...l, ...next]);
      return;
    }
    if (cmd === "help") next.push(...HELP);
    else if (cmd === "whoami") next.push(`${site.name} — ${site.title}`, site.tagline);
    else if (cmd === "journey" || cmd === "missions")
      next.push("1 Learning production engineering", "2 Building enterprise software", "3 Scaling systems");
    else if (cmd === "systems") next.push("CA Cloud Desk · InfraMind AI");
    else if (cmd === "principles")
      next.push("Performance is a feature · Simple systems survive · Measure before optimizing");
    else if (cmd === "focus")
      next.push("Distributed Systems · System Design · AI Infrastructure · Scalable Backends · Cloud");
    else if (cmd === "stack") next.push("Python · Django · DRF · PostgreSQL · Redis · Celery · AWS · RAG");
    else if (cmd === "impact") next.push("150K+ tasks · 100K+ invoices · 600+ LeetCode · zero-loss cutovers");
    else if (cmd === "resume") {
      next.push("Opening resume…");
      window.open(site.resume, "_blank", "noopener,noreferrer");
    } else if (cmd === "contact") next.push(site.email);
    else if (cmd === "clear") {
      setLines(["devansh.os terminal — type `help`"]);
      setInput("");
      return;
    } else if (cmd === "exit" || cmd === "quit") {
      setTerminalOpen(false);
      return;
    } else if (cmd === "palette") {
      setTerminalOpen(false);
      setCommandOpen(true);
      return;
    } else next.push(`command not found: ${cmd}`);

    setLines((l) => [...l, ...next]);
    setInput("");
  };

  return (
    <AnimatePresence>
      {terminalOpen && (
        <motion.div
          className="fixed inset-0 z-[88] flex items-center justify-center bg-black/55 px-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setTerminalOpen(false)}
        >
          <motion.div
            className="glass glow-border flex h-[min(420px,70vh)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
              <p className="font-mono text-[11px] text-[var(--accent)]">devansh@portfolio:~</p>
              <button
                type="button"
                className="font-mono text-[10px] text-[var(--fg-dim)] hover:text-[var(--fg)]"
                onClick={() => setTerminalOpen(false)}
              >
                close
              </button>
            </div>
            <div className="flex-1 overflow-auto px-4 py-3 font-mono text-xs leading-relaxed text-[var(--fg-muted)]">
              {lines.map((line, i) => (
                <p key={`${i}-${line.slice(0, 12)}`} className="whitespace-pre-wrap">
                  {line}
                </p>
              ))}
              <div ref={endRef} />
            </div>
            <form
              className="flex items-center gap-2 border-t border-white/10 px-4 py-3"
              onSubmit={(e) => {
                e.preventDefault();
                run(input);
              }}
            >
              <span className="font-mono text-xs text-[var(--accent)]">$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent font-mono text-xs text-[var(--fg)] outline-none"
                spellCheck={false}
                autoComplete="off"
              />
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
