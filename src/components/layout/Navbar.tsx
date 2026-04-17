'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX, FiDownload } from 'react-icons/fi';

const navLinks = [
  { label: 'About',    href: '#about'    },
  { label: 'Skills',   href: '#skills'   },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact'  },
];

interface Props {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export default function Navbar({ theme, toggleTheme }: Props) {
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [imgError, setImgError]     = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const scrollToSection = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navBg = scrolled
    ? theme === 'dark'
      ? 'bg-[#030712]/85 backdrop-blur-xl border-b border-white/5'
      : 'bg-white/85 backdrop-blur-xl border-b border-slate-200/80 shadow-sm'
    : '';

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${scrolled ? 'py-3' : 'py-5'} ${navBg}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <motion.a
            href="#"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.02 }}
          >
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center overflow-hidden transition-all duration-300 ${imgError ? 'text-sm font-bold gradient-text-cyan' : ''}`}
              style={{
                border: '1px solid rgba(0,245,255,0.25)',
                background: imgError ? 'linear-gradient(135deg, rgba(0,245,255,0.14), rgba(139,92,246,0.14))' : undefined,
                fontFamily: imgError ? 'Syne, serif' : undefined,
              }}
            >
              {!imgError ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img 
                  src="/profile.jpg"  
                  alt="Aniket Singh" 
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              ) : "AS"}
            </div>
            <span
              className="hidden sm:block text-sm font-semibold tracking-wider dark:text-white/80 text-slate-800"
              style={{ fontFamily: 'Syne, serif' }}
            >
              Aniket Singh
            </span>
          </motion.a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="relative text-sm dark:text-slate-400 text-slate-600 dark:hover:text-white hover:text-slate-900 transition-colors duration-200 group font-mono tracking-wide"
              >
                <span className="text-cyan-500/60 text-xs mr-1">0{i + 1}.</span>
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-cyan-400 to-violet-500 group-hover:w-full transition-all duration-300" />
              </motion.button>
            ))}

            {/* Theme toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
              className="w-9 h-9 rounded-lg flex items-center justify-center dark:text-slate-400 text-slate-600 dark:hover:text-cyan-400 hover:text-cyan-600 transition-colors duration-200"
              style={{
                background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.1)',
              }}
            >
              {theme === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
            </motion.button>

            {/* Resume */}
            <motion.a
              href="https://drive.google.com/file/d/18Yg53CGF3dDHck29joFLt534hLo_V32C/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm px-4 py-2 rounded-lg font-mono tracking-wide transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(0,245,255,0.14), rgba(139,92,246,0.1))',
                border: '1px solid rgba(0,245,255,0.28)',
                color: '#00c8d4',
              }}
            >
              Resume ↗
            </motion.a>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="dark:text-slate-400 text-slate-600 p-2"
            >
              {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
            <button
              onClick={() => setMobileOpen(o => !o)}
              className="dark:text-slate-400 text-slate-600 dark:hover:text-white hover:text-slate-900 p-2"
            >
              {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-30 dark:bg-black/40 bg-black/20"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 right-0 w-72 z-40 flex flex-col pt-24 pb-8 px-8 gap-5 dark:bg-[#030712]/96 bg-white/96 backdrop-blur-xl dark:border-l dark:border-white/7 border-l border-slate-200"
            >
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="text-left text-xl font-semibold dark:text-slate-300 text-slate-700 dark:hover:text-cyan-400 hover:text-cyan-600 transition-colors py-2 dark:border-b dark:border-white/5 border-b border-slate-100"
                  style={{ fontFamily: 'Syne, serif' }}
                >
                  <span className="text-cyan-500/50 text-sm font-mono mr-3">0{i + 1}.</span>
                  {link.label}
                </motion.button>
              ))}
              <a
                href="https://drive.google.com/file/d/1z7YEYUlqArMu9aIoUHLg3bOUdncuM7Ml/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-center py-3 rounded-lg text-cyan-500 dark:text-cyan-400 font-mono text-sm flex items-center justify-center gap-2"
                style={{ background: 'rgba(0,245,255,0.08)', border: '1px solid rgba(0,245,255,0.2)' }}
              >
                <FiDownload size={14} /> View Resume ↗
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
