'use client';

import { motion } from 'framer-motion';
import {
  FiCode, FiServer, FiDatabase, FiTool,
  FiCpu, FiCloud, FiGitBranch, FiPackage,
  FiLayout, FiZap, FiBox, FiTerminal,
} from 'react-icons/fi';
import SectionHeading from '@/components/ui/SectionHeading';

const skillCategories = [
  {
    label: 'Frontend',
    color: 'cyan',
    icon: FiLayout,
    skills: [
      { name: 'JavaScript', icon: FiCode, level: 88 },
      { name: 'TypeScript', icon: FiCode, level: 80 },
      { name: 'React.js', icon: FiZap, level: 85 },
      { name: 'Next.js', icon: FiZap, level: 82 },
      { name: 'Tailwind CSS', icon: FiLayout, level: 90 },
      { name: 'HTML5', icon: FiCode, level: 95 },
      { name: 'CSS3', icon: FiLayout, level: 88 },
      { name: 'Redux', icon: FiBox, level: 72 },
    ],
  },
  {
    label: 'Backend',
    color: 'violet',
    icon: FiServer,
    skills: [
      { name: 'Node.js', icon: FiServer, level: 80 },
      { name: 'Express.js', icon: FiServer, level: 78 },
      { name: 'Python', icon: FiTerminal, level: 75 },
      { name: 'Java', icon: FiCpu, level: 70 },
    ],
  },
  {
    label: 'Databases & Cloud',
    color: 'rose',
    icon: FiDatabase,
    skills: [
      { name: 'MongoDB', icon: FiDatabase, level: 78 },
      { name: 'PostgreSQL', icon: FiDatabase, level: 70 },
      { name: 'MySQL', icon: FiDatabase, level: 72 },
      { name: 'Firebase', icon: FiCloud, level: 68 },
    ],
  },
  {
    label: 'Tools & DevOps',
    color: 'cyan',
    icon: FiTool,
    skills: [
      { name: 'Git', icon: FiGitBranch, level: 85 },
      { name: 'Docker', icon: FiPackage, level: 60 },
      { name: 'AWS / GCP', icon: FiCloud, level: 55 },
      { name: 'Linux', icon: FiTerminal, level: 70 },
    ],
  },
];

const colorMap = {
  cyan: { bar: 'from-cyan-400 to-cyan-500', text: 'text-cyan-400', bg: 'rgba(0,245,255,0.08)', border: 'rgba(0,245,255,0.15)' },
  violet: { bar: 'from-violet-400 to-violet-500', text: 'text-violet-400', bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.15)' },
  rose: { bar: 'from-rose-400 to-rose-500', text: 'text-rose-400', bg: 'rgba(244,63,94,0.08)', border: 'rgba(244,63,94,0.15)' },
};

export default function SkillsSection() {
  return (
    <section id="skills" className="section-padding section-alt relative" style={{ zIndex: 1 }}>
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="Skills"
          title="Technical Arsenal"
          subtitle="Technologies and tools I use to bring ideas to life."
        />

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((cat, ci) => {
            const colors = colorMap[cat.color as keyof typeof colorMap];
            return (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.15, duration: 0.6 }}
                className="glass-card rounded-2xl p-6 hover:border-white/10 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: colors.bg, border: `1px solid ${colors.border}` }}
                  >
                    <cat.icon size={14} className={colors.text} />
                  </div>
                  <h3
                    className={`font-bold text-lg ${colors.text}`}
                    style={{ fontFamily: 'Syne, serif' }}
                  >
                    {cat.label}
                  </h3>
                </div>

                <div className="space-y-4">
                  {cat.skills.map((skill, si) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: ci * 0.1 + si * 0.06 }}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <skill.icon size={14} className="dark:text-slate-400 text-slate-500" />
                          <span className="text-sm dark:text-slate-300 text-slate-700 font-mono">{skill.name}</span>
                        </div>
                        <span className={`text-xs font-mono ${colors.text}`}>{skill.level}%</span>
                      </div>
                      <div className="h-1 rounded-full dark:bg-white/5 bg-slate-200 overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full bg-gradient-to-r ${colors.bar}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: ci * 0.1 + si * 0.06, ease: 'easeOut' }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tech icons parade */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 overflow-hidden"
        >
          <p className="text-xs font-mono dark:text-slate-600 text-slate-400 tracking-widest text-center uppercase mb-6">
            Also familiar with
          </p>
          <div className="flex gap-6 flex-wrap justify-center">
            {[FiCode, FiZap, FiServer, FiDatabase, FiCloud, FiGitBranch, FiPackage, FiTerminal, FiCpu, FiBox, FiLayout, FiTool].map((Icon, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.3 }}
                className="dark:text-slate-700 text-slate-400 dark:hover:text-cyan-400 hover:text-cyan-500 transition-colors duration-200 cursor-default"
              >
                <Icon size={24} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
