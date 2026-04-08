'use client';

import { motion } from 'framer-motion';

interface Props {
  label: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export default function SectionHeading({ label, title, subtitle, align = 'center' }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      <span className="text-xs tracking-[0.35em] uppercase font-mono text-cyan-500 dark:text-cyan-400/70 mb-4 block">
        — {label} —
      </span>
      <h2
        className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 dark:text-white text-slate-900"
        style={{ fontFamily: 'Syne, serif' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="dark:text-slate-400 text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className={`mt-6 flex gap-2 ${align === 'center' ? 'justify-center' : 'justify-start'}`}>
        <div className="h-px w-12 bg-gradient-to-r from-cyan-400 to-violet-500" />
        <div className="h-px w-4 bg-gradient-to-r from-violet-500 to-rose-400" />
        <div className="h-px w-2 bg-rose-400/50" />
      </div>
    </motion.div>
  );
}
