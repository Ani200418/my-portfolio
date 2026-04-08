'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiGithub, FiLinkedin, FiInstagram, FiDownload, FiExternalLink } from 'react-icons/fi';
import { useRef, useState, useEffect } from 'react';

const RESUME_URL = 'https://drive.google.com/file/d/1z7YEYUlqArMu9aIoUHLg3bOUdncuM7Ml/view?usp=sharing';

const socials = [
  { icon: FiGithub,    href: 'https://github.com/Ani200418',                 label: 'GitHub'    },
  { icon: FiLinkedin,  href: 'https://www.linkedin.com/in/aniketsingh1805/', label: 'LinkedIn'  },
  { icon: FiInstagram, href: 'https://www.instagram.com/im_aniketsingh_/',   label: 'Instagram' },
];

function AnimatedLetter({ char, delay }: { char: string; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 50, rotateX: -80 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="inline-block dark:text-white text-slate-900 cursor-default select-none"
      style={{ transformOrigin: 'bottom center', transformStyle: 'preserve-3d' }}
      whileHover={{
        y: -10,
        color: '#00f5ff',
        textShadow: '0 0 40px rgba(0,245,255,0.9)',
        transition: { duration: 0.15 },
      }}
    >
      {char}
    </motion.span>
  );
}

function FloatingOrb({ className, delay = 0, dur = 6 }: { className: string; delay?: number; dur?: number }) {
  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${className}`}
      animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: dur, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  );
}

export default function HeroSection() {
  const ref      = useRef<HTMLDivElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  /* Scroll — only parallax the video scale, NOT content position */
  const { scrollYProgress } = useScroll({ target: ref });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  /* Mouse parallax — subtle tilt on content */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const tiltX  = useSpring(useTransform(mouseX, [-1, 1], [-4, 4]),  { stiffness: 50, damping: 20 });
  const tiltY  = useSpring(useTransform(mouseY, [-1, 1], [3, -3]),  { stiffness: 50, damping: 20 });

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth  - 0.5) * 2);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener('mousemove', fn);
    return () => window.removeEventListener('mousemove', fn);
  }, [mouseX, mouseY]);

  const firstName = 'Aniket'.split('');
  const lastName  = 'Singh'.split('');

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ── VIDEO ─────────────────────────────────────────────── */}
      <motion.div
        style={{ scale: videoScale }}
        className="absolute inset-0 z-0 origin-center"
      >
        <video
          className="w-full h-full object-cover object-center"
          src="/space.mp4"
          autoPlay muted loop playsInline
          onCanPlay={() => setVideoReady(true)}
          aria-hidden="true"
        />
        {/* black cover fades away once video starts */}
        <motion.div
          className="absolute inset-0 bg-[#030712]"
          initial={{ opacity: 1 }}
          animate={{ opacity: videoReady ? 0 : 1 }}
          transition={{ duration: 1.4 }}
        />
      </motion.div>

      {/* ── OVERLAYS ──────────────────────────────────────────── */}
      {/* Dark: subtle top+bottom vignette — keep middle clear */}
      <div className="hidden dark:block absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(3,7,18,0.65) 0%, rgba(3,7,18,0.0) 28%, rgba(3,7,18,0.0) 72%, rgba(3,7,18,0.75) 100%),' +
            'radial-gradient(ellipse at 50% 50%, transparent 45%, rgba(3,7,18,0.4) 100%)',
        }}
      />
      {/* Light: frosted wash */}
      <div className="dark:hidden absolute inset-0 z-[1] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(240,244,255,0.86) 0%, rgba(240,244,255,0.6) 50%, rgba(240,244,255,0.9) 100%)' }}
      />

      {/* ── WATERMARK — z sits ABOVE overlay so it's visible ── */}
      {/*   overflow-visible on parent so letters aren't clipped  */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-[3]"
        style={{ overflow: 'visible' }}>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1.6 }}
          className="font-black whitespace-nowrap dark:text-white/[0.07] text-slate-900/[0.06]"
          style={{
            fontFamily: 'Syne, serif',
            fontSize: 'clamp(5rem, 18vw, 16rem)',
            lineHeight: 1,
            letterSpacing: '-0.04em',
            /* keep it horizontally centered and never clip */
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'max-content',
          }}
        >
          ANIKET
        </motion.span>
      </div>

      {/* ── FLOATING ORBS ─────────────────────────────────────── */}
      <FloatingOrb className="w-72 h-72 bg-cyan-400/[0.07] blur-3xl -top-10 -left-16 dark:block hidden"  delay={0}   dur={7} />
      <FloatingOrb className="w-96 h-96 bg-violet-500/[0.06] blur-3xl -bottom-10 -right-20 dark:block hidden" delay={1.5} dur={9} />
      <FloatingOrb className="w-48 h-48 bg-rose-400/[0.05] blur-2xl top-1/3 right-1/4 dark:block hidden"  delay={3}   dur={6} />

      {/* ── MAIN CONTENT ──────────────────────────────────────── */}
      {/*   NO y-parallax here so content is visible immediately   */}
      <motion.div
        style={{ rotateX: tiltY, rotateY: tiltX, perspective: 800 }}
        className="relative z-[4] w-full max-w-5xl mx-auto text-center px-6 flex flex-col items-center justify-center min-h-screen py-28"
      >

        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-10 backdrop-blur-md"
          style={{ background: 'rgba(0,245,255,0.07)', border: '1px solid rgba(0,245,255,0.22)' }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="text-xs font-mono tracking-[0.25em] uppercase dark:text-slate-300 text-slate-600">
            Available for opportunities
          </span>
        </motion.div>

        {/* ── NAME ──────────────────────────────────────────────── */}
        <div className="mb-5" style={{ perspective: '800px' }}>
          {/* First name — letter-by-letter 3D flip */}
          <div
            className="flex justify-center"
            style={{
              fontFamily: 'Syne, serif',
              fontSize: 'clamp(3rem, 9vw, 7.5rem)',
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: '-0.03em',
            }}
          >
            {firstName.map((char, i) => (
              <AnimatedLetter key={i} char={char} delay={0.3 + i * 0.07} />
            ))}
          </div>

          {/* Last name — slides up, gradient */}
          <motion.div
            initial={{ opacity: 0, y: 44 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72, duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'Syne, serif',
              fontSize: 'clamp(3rem, 9vw, 7.5rem)',
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: '-0.03em',
            }}
          >
            <span className="gradient-text-cyan">
              {lastName.map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  whileHover={{ y: -10, scale: 1.1, transition: { duration: 0.15 } }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </motion.div>
        </div>

        {/* Divider with role tag */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1.0, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-cyan-400/60" />
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase dark:text-slate-400 text-slate-500">
            Software Developer · Student @ CU
          </span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-cyan-400/60" />
        </motion.div>

        {/* Typing */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-lg sm:text-xl md:text-2xl font-mono mb-7 h-9"
        >
          <TypeAnimation
            sequence={[
              'Full Stack Engineer',    2000,
              'React · Next.js · Node', 2000,
              'Problem Solver',         1800,
              'Open Source Builder',    2000,
              'B.Tech CS @ CU',         1800,
            ]}
            wrapper="span"
            speed={55}
            repeat={Infinity}
            className="text-cyan-500 dark:text-cyan-400"
          />
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.65 }}
          className="dark:text-slate-400 text-slate-600 text-base sm:text-lg max-w-lg mx-auto leading-relaxed mb-11"
        >
          Passionate developer focused on building{' '}
          <span className="dark:text-white text-slate-900 font-semibold">scalable applications</span>{' '}
          and solving{' '}
          <span className="dark:text-white text-slate-900 font-semibold">real-world problems</span>.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          {/* Primary */}
          <motion.button
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.06, boxShadow: '0 0 36px rgba(0,245,255,0.5)' }}
            whileTap={{ scale: 0.95 }}
            className="relative group px-9 py-4 rounded-2xl text-sm font-bold tracking-wider overflow-hidden"
            style={{ fontFamily: 'Syne, serif' }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-violet-500 to-cyan-400 bg-[length:200%_100%] transition-[background-position] duration-500 group-hover:[background-position:right_center]" />
            <span className="relative z-10 text-[#030712] flex items-center gap-2">
              View My Work
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                →
              </motion.span>
            </span>
          </motion.button>

          {/* Resume */}
          <motion.a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: '0 0 24px rgba(0,245,255,0.18)' }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-9 py-4 rounded-2xl text-sm font-semibold tracking-wide dark:text-slate-200 text-slate-700 dark:hover:text-white hover:text-slate-900 backdrop-blur-md transition-all duration-300"
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.15)',
              fontFamily: 'Syne, serif',
            }}
          >
            <FiDownload size={15} />
            Resume
            <FiExternalLink size={12} className="opacity-60" />
          </motion.a>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="flex items-center justify-center gap-3"
        >
          {socials.map(({ icon: Icon, href, label }, idx) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6 + idx * 0.1, type: 'spring', stiffness: 220 }}
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="w-11 h-11 rounded-xl flex items-center justify-center dark:text-slate-400 text-slate-500 hover:text-cyan-500 dark:hover:text-cyan-400 transition-all duration-300 backdrop-blur-md relative group"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <Icon size={18} />
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-mono dark:text-slate-400 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {label}
              </span>
            </motion.a>
          ))}
          <div className="w-px h-7 dark:bg-white/10 bg-slate-300/50 mx-1" />
          <span className="text-[10px] font-mono dark:text-slate-600 text-slate-400 tracking-[0.25em] uppercase">
            Find me
          </span>
        </motion.div>
      </motion.div>

      {/* ── SCROLL INDICATOR ──────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-[5] group"
        onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <div className="w-6 h-10 rounded-full border dark:border-white/15 border-slate-400/30 flex items-start justify-center pt-2 overflow-hidden">
          <motion.div
            className="w-1 h-2.5 rounded-full bg-cyan-400"
            animate={{ y: [0, 16, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <span className="text-[9px] font-mono dark:text-slate-600 text-slate-400 tracking-[0.3em] uppercase group-hover:text-cyan-500 transition-colors">
          Scroll
        </span>
      </motion.div>

      {/* ── CORNER LINES ──────────────────────────────────────── */}
      <div className="absolute top-0 left-0 z-[5] pointer-events-none">
        <div className="w-px h-20 bg-gradient-to-b from-cyan-400/50 to-transparent ml-6 mt-0" />
        <div className="h-px w-20 bg-gradient-to-r from-cyan-400/50 to-transparent mt-[-1px] ml-6" style={{ marginTop: '-80px', marginLeft: 0 }} />
      </div>
      <div className="absolute top-0 right-0 z-[5] pointer-events-none opacity-50">
        <div className="w-px h-20 bg-gradient-to-b from-violet-400/50 to-transparent mr-6" style={{ marginLeft: 'auto' }} />
      </div>
    </section>
  );
}
