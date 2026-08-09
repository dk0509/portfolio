"use client";

import { motion } from "framer-motion";

type Props = {
  number: string;
  title: string;
  subtitle?: string;
};

export function SectionHeading({ number, title, subtitle }: Props) {
  return (
    <div className="mb-10 max-w-2xl md:mb-14">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4 }}
        className="mb-3 font-mono text-[11px] tracking-[0.32em] text-[var(--accent)] uppercase"
      >
        {number}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.04 }}
        className="font-display text-3xl leading-[1.08] tracking-tight text-[var(--fg)] sm:text-4xl md:text-5xl"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--fg-muted)] md:text-base md:leading-7"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
