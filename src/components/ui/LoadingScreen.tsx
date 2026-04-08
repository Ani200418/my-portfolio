'use client';

import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030712]"
      >
        {/* Radial glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.55 }}
          className="relative flex flex-col items-center gap-8"
        >
          {/* Spinning ring + initials */}
          <div className="relative w-20 h-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-2xl border border-cyan-500/25"
              style={{ background: 'linear-gradient(135deg,rgba(0,245,255,0.08),rgba(139,92,246,0.08))' }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold gradient-text-cyan" style={{ fontFamily: 'Syne, serif' }}>
                AS
              </span>
            </div>
          </div>

          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xs tracking-[0.35em] uppercase font-mono text-slate-500"
          >
            Initializing Portfolio
          </motion.p>

          {/* Shimmer bar */}
          <div className="w-44 h-px bg-white/5 overflow-hidden rounded-full">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              className="h-full w-20 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            />
          </div>

          {/* Dots */}
          <div className="flex gap-2">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-cyan-400/50"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
