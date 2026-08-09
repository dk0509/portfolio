"use client";

import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ExperienceProvider } from "@/components/providers/ExperienceProvider";
import { Loader } from "@/components/layout/Loader";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Navigation } from "@/components/layout/Navigation";
import { CursorSpotlight } from "@/components/layout/CursorSpotlight";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { FloatingParticles } from "@/components/layout/FloatingParticles";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { TerminalEgg } from "@/components/layout/TerminalEgg";
import { RecruiterToggle } from "@/components/layout/RecruiterToggle";
import { Intro } from "@/components/sections/Intro";
import { Journey } from "@/components/sections/Journey";
import { Systems } from "@/components/sections/Systems";
import { Architecture } from "@/components/sections/Architecture";
import { Philosophy } from "@/components/sections/Philosophy";
import { Impact } from "@/components/sections/Impact";
import { CurrentFocus } from "@/components/sections/CurrentFocus";
import { TechStack } from "@/components/sections/TechStack";
import { Contact } from "@/components/sections/Contact";

function ExperienceShell() {
  return (
    <SmoothScroll>
      <div className="noise" aria-hidden />
      <FloatingParticles />
      <CursorSpotlight />
      <ScrollProgress />
      <Navigation />
      <RecruiterToggle />
      <CommandPalette />
      <TerminalEgg />
      <div>
        <Intro />
        <Journey />
        <Systems />
        <Architecture />
        <Philosophy />
        <TechStack />
        <Impact />
        <CurrentFocus />
        <Contact />
      </div>
    </SmoothScroll>
  );
}

export function PortfolioExperience() {
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(true);

  const onComplete = useCallback(() => {
    setLoading(false);
    setTimeout(() => setReady(true), 50);
  }, []);

  return (
    <ExperienceProvider>
      <AnimatePresence>{loading && <Loader key="loader" onComplete={onComplete} />}</AnimatePresence>
      {ready && <ExperienceShell />}
    </ExperienceProvider>
  );
}
