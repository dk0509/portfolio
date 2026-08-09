"use client";

import { Briefcase, Command } from "lucide-react";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { cn } from "@/lib/utils";

export function RecruiterToggle() {
  const { recruiterMode, toggleRecruiterMode, setCommandOpen } = useExperience();

  return (
    <div className="fixed right-4 bottom-4 z-[56] flex flex-col items-end gap-2 sm:right-6 sm:bottom-6">
      <button
        type="button"
        onClick={() => setCommandOpen(true)}
        className="glass hidden items-center gap-2 rounded-full px-3 py-2 font-mono text-[10px] tracking-wide text-[var(--fg-muted)] hover:text-[var(--fg)] md:inline-flex"
        aria-label="Open command palette"
      >
        <Command className="h-3.5 w-3.5" />
        ⌘K
      </button>
      <button
        type="button"
        onClick={toggleRecruiterMode}
        className={cn(
          "glass glow-border inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs tracking-tight transition",
          recruiterMode ? "bg-[var(--accent)]/20 text-[var(--fg)]" : "text-[var(--fg-muted)] hover:text-[var(--fg)]",
        )}
        aria-pressed={recruiterMode}
      >
        <Briefcase className="h-3.5 w-3.5" />
        {recruiterMode ? "Recruiter Mode On" : "Recruiter Mode"}
      </button>
    </div>
  );
}
