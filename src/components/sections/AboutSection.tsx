'use client';

import { motion } from 'framer-motion';
import { FiCode, FiCpu, FiZap, FiBook } from 'react-icons/fi';
import SectionHeading from '@/components/ui/SectionHeading';

const stats = [
  { value: '10+',    label: 'Projects',    icon: FiCode },
  { value: '5+',     label: 'Tech Stacks', icon: FiCpu  },
  { value: '2+',     label: 'Yrs Coding',  icon: FiZap  },
  { value: 'B.Tech', label: 'CS Student',  icon: FiBook },
];

const highlights = [
  { label: 'University', value: 'Chandigarh University'  },
  { label: 'Degree',     value: 'B.Tech Computer Science' },
  { label: 'Focus',      value: 'Full Stack Development'  },
  { label: 'Status',     value: 'Actively Learning'       },
];

export default function AboutSection() {
  return (
    <section id="about" className="section-padding section-alt relative" style={{ zIndex: 1 }}>
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="About Me"
          title="Crafting Code, Creating Impact"
          subtitle="A glimpse into who I am and what drives me."
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="space-y-5 dark:text-slate-400 text-slate-600 text-base leading-relaxed">
              <p>
                Hey! I&apos;m{' '}
                <span className="dark:text-white text-slate-900 font-semibold">Aniket Singh</span>, a
                passionate software developer and Computer Science student at{' '}
                <span className="text-cyan-500 dark:text-cyan-400">Chandigarh University</span>. I
                thrive at the intersection of clean code and impactful design.
              </p>
              <p>
                My journey started with curiosity about how things work under the hood — and grew
                into a passion for building full-stack applications that solve{' '}
                <span className="dark:text-white/80 text-slate-800 font-medium">real-world problems</span>{' '}
                at scale.
              </p>
              <p>
                When I&apos;m not pushing commits, I enjoy contributing to open-source, exploring new
                frameworks, and sharpening DSA skills. I believe in writing code that&apos;s not just
                functional but{' '}
                <span className="text-violet-500 dark:text-violet-400 font-medium">
                  elegant and maintainable
                </span>.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4">
              {highlights.map(({ label, value }) => (
                <div
                  key={label}
                  className="glass-card rounded-xl p-4 hover:border-cyan-500/20 transition-all duration-300"
                >
                  <p className="text-xs font-mono dark:text-slate-600 text-slate-400 uppercase tracking-widest mb-1">
                    {label}
                  </p>
                  <p className="text-sm font-semibold dark:text-white/80 text-slate-800">{value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="relative mx-auto w-fit">
              <div
                className="w-64 h-64 mx-auto rounded-3xl relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,245,255,0.07), rgba(139,92,246,0.07))',
                  border: '1px solid rgba(0,245,255,0.14)',
                }}
              >
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(0,245,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.2) 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <span className="text-7xl font-black gradient-text-cyan" style={{ fontFamily: 'Syne, serif' }}>
                    AS
                  </span>
                  <span className="text-xs font-mono dark:text-slate-600 text-slate-400 tracking-widest">
                    SOFTWARE DEV
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-40 h-6 bg-cyan-400/20 blur-xl" />

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -right-4 top-8 glass-card rounded-xl px-4 py-3 text-center"
              >
                <p className="text-xs font-mono dark:text-slate-500 text-slate-400">Stack</p>
                <p className="text-sm font-semibold gradient-text-cyan">Full Stack</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
                className="absolute -left-4 bottom-8 glass-card rounded-xl px-4 py-3 text-center"
              >
                <p className="text-xs font-mono dark:text-slate-500 text-slate-400">Status</p>
                <p className="text-sm font-semibold text-emerald-500 dark:text-emerald-400">Available</p>
              </motion.div>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {stats.map(({ value, label, icon: Icon }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="glass-card rounded-xl p-4 text-center group cursor-default"
                >
                  <Icon size={15} className="text-cyan-500/50 dark:text-cyan-400/50 mx-auto mb-2 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors" />
                  <p className="text-lg font-black gradient-text-cyan mb-1" style={{ fontFamily: 'Syne, serif' }}>
                    {value}
                  </p>
                  <p className="text-xs dark:text-slate-600 text-slate-400 leading-tight">{label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
