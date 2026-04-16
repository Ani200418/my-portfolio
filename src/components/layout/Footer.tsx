'use client';

import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiInstagram, FiHeart, FiArrowUp } from 'react-icons/fi';

const socials = [
  { icon: FiGithub,    href: 'https://github.com/Ani200418',                 label: 'GitHub'    },
  { icon: FiLinkedin,  href: 'https://www.linkedin.com/in/aniketsingh1805/', label: 'LinkedIn'  },
  { icon: FiInstagram, href: 'https://www.instagram.com/im_aniketsingh_/',   label: 'Instagram' },
];

const navLinks = [
  { label: 'About',    href: '#about'    },
  { label: 'Skills',   href: '#skills'   },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact'  },
];

export default function Footer() {
  return (
    <footer className="relative dark:border-t dark:border-white/5 border-t border-slate-200 pt-16 pb-8 px-6" style={{ zIndex: 1 }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-base font-bold gradient-text-cyan"
                style={{ background: 'linear-gradient(135deg,rgba(0,245,255,0.12),rgba(139,92,246,0.12))', border: '1px solid rgba(0,245,255,0.22)', fontFamily: 'Syne, serif' }}>
                AS
              </div>
              <span className="text-lg font-bold dark:text-white/90 text-slate-900" style={{ fontFamily: 'Syne, serif' }}>
                Aniket Singh
              </span>
            </div>
            <p className="text-sm dark:text-slate-500 text-slate-500 leading-relaxed max-w-xs">
              Software Developer &amp; CS Student. Building scalable apps and solving real-world problems, one commit at a time.
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  className="w-9 h-9 rounded-lg flex items-center justify-center dark:text-slate-500 text-slate-500 hover:text-cyan-500 dark:hover:text-cyan-400 transition-all duration-200 glass-card">
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="text-xs font-mono dark:text-slate-600 text-slate-400 uppercase tracking-widest mb-5">Navigation</p>
            <ul className="space-y-3">
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <a href={href}
                    onClick={e => { e.preventDefault(); document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="text-sm dark:text-slate-500 text-slate-500 dark:hover:text-cyan-400 hover:text-cyan-600 transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-3 h-px bg-cyan-400 transition-all duration-200" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact quick */}
          <div>
            <p className="text-xs font-mono dark:text-slate-600 text-slate-400 uppercase tracking-widest mb-5">Get In Touch</p>
            <ul className="space-y-3">
              {['aniketsingh886909@gmail.com','aniketsingh00011@gmail.com'].map(email => (
                <li key={email}>
                  <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`} target="_blank" rel="noopener noreferrer" className="text-sm dark:text-slate-500 text-slate-500 dark:hover:text-cyan-400 hover:text-cyan-600 transition-colors break-all">
                    {email}
                  </a>
                </li>
              ))}
              {['+91 6239318834','+91 8869094152'].map(ph => (
                <li key={ph}>
                  <a href={`tel:${ph.replace(/\s/g,'')}`} className="text-sm dark:text-slate-500 text-slate-500 dark:hover:text-cyan-400 hover:text-cyan-600 transition-colors">
                    {ph}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 dark:border-t dark:border-white/5 border-t border-slate-200">
          <p className="text-xs dark:text-slate-600 text-slate-400 flex items-center gap-1.5">
            Crafted with <FiHeart size={11} className="text-rose-400 animate-pulse" /> by{' '}
            <span className="dark:text-slate-400 text-slate-600">Aniket Singh</span> · © {new Date().getFullYear()}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono dark:text-slate-700 text-slate-400">
              Next.js · Tailwind · Framer Motion
            </span>
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-8 h-8 rounded-lg flex items-center justify-center dark:text-slate-600 text-slate-500 dark:hover:text-cyan-400 hover:text-cyan-600 transition-all glass-card"
              aria-label="Back to top"
            >
              <FiArrowUp size={13} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
