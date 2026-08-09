"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type ExperienceContextValue = {
  recruiterMode: boolean;
  setRecruiterMode: (v: boolean) => void;
  toggleRecruiterMode: () => void;
  commandOpen: boolean;
  setCommandOpen: (v: boolean) => void;
  terminalOpen: boolean;
  setTerminalOpen: (v: boolean) => void;
  reduceMotion: boolean;
};

const ExperienceContext = createContext<ExperienceContextValue | null>(null);

export function ExperienceProvider({ children }: { children: React.ReactNode }) {
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [prefersReduce, setPrefersReduce] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPrefersReduce(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("recruiter-mode", recruiterMode);
  }, [recruiterMode]);

  const toggleRecruiterMode = useCallback(() => setRecruiterMode((v) => !v), []);

  const value = useMemo(
    () => ({
      recruiterMode,
      setRecruiterMode,
      toggleRecruiterMode,
      commandOpen,
      setCommandOpen,
      terminalOpen,
      setTerminalOpen,
      reduceMotion: recruiterMode || prefersReduce,
    }),
    [recruiterMode, toggleRecruiterMode, commandOpen, terminalOpen, prefersReduce],
  );

  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>;
}

export function useExperience() {
  const ctx = useContext(ExperienceContext);
  if (!ctx) throw new Error("useExperience must be used within ExperienceProvider");
  return ctx;
}
