"use client";

import { motion } from "framer-motion";
import { Mail, FileText } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { Chapter } from "@/components/ui/Chapter";
import { site } from "@/data/content";
import { useExperience } from "@/components/providers/ExperienceProvider";

export function Contact() {
  const { reduceMotion } = useExperience();

  return (
    <Chapter id="contact" className="overflow-hidden py-24 md:py-36">
      <div className="aurora opacity-60" />
      <div className="grid-floor absolute inset-0 opacity-35" />

      <div className="relative z-10 mx-auto max-w-5xl px-5 text-center sm:px-6 md:px-10">
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-5 font-mono text-[11px] tracking-[0.32em] text-[var(--accent)] uppercase"
        >
          08 — Let&apos;s Build Something Great
        </motion.p>

        <motion.h2
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Ready for the next
          <span className="mt-2 block text-[var(--accent)]">production system.</span>
        </motion.h2>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-[var(--fg-muted)] md:text-base"
        >
          Backend roles, system design conversations, and teams shipping multi-tenant platforms,
          migrations, or AI workflows.
        </motion.p>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-col items-center gap-4"
        >
          <a href={`mailto:${site.email}`} className="group relative inline-flex">
            <span className="absolute inset-0 rounded-full bg-[var(--accent)]/15 blur-xl transition group-hover:bg-[var(--accent)]/28" />
            <span className="glass glow-border relative inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-base sm:px-8 sm:py-4 sm:text-lg">
              <Mail className="h-5 w-5 text-[var(--accent)]" />
              <span className="font-display tracking-tight">{site.email}</span>
            </span>
          </a>

          <div className="mt-3 flex flex-wrap justify-center gap-2.5">
            <MagneticButton href={site.links.github} target="_blank" rel="noopener noreferrer">
              <GitHubIcon className="h-4 w-4" />
              GitHub
            </MagneticButton>
            <MagneticButton href={site.links.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedInIcon className="h-4 w-4" />
              LinkedIn
            </MagneticButton>
            <MagneticButton href={site.resume} target="_blank" rel="noopener noreferrer">
              <FileText className="h-4 w-4" />
              Resume
            </MagneticButton>
          </div>
        </motion.div>

        <p className="mt-16 font-mono text-[10px] tracking-[0.2em] text-[var(--fg-dim)] uppercase">
          {site.name} · {site.location} · ⌘K
        </p>
      </div>
    </Chapter>
  );
}
