'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiGithub, FiLinkedin, FiInstagram, FiSend } from 'react-icons/fi';
import SectionHeading from '@/components/ui/SectionHeading';

const contactItems = [
  { icon: FiMail,  label: 'Primary Email',   value: 'aniketsingh886909@gmail.com', href: 'https://mail.google.com/mail/?view=cm&fs=1&to=aniketsingh886909@gmail.com', color: 'cyan'   },
  { icon: FiMail,  label: 'Secondary Email',  value: 'aniketsingh00011@gmail.com',  href: 'https://mail.google.com/mail/?view=cm&fs=1&to=aniketsingh00011@gmail.com',  color: 'violet' },
  { icon: FiPhone, label: 'Phone 1',          value: '+91 6239318834',              href: 'tel:+916239318834',                  color: 'rose'   },
  { icon: FiPhone, label: 'Phone 2',          value: '+91 8869094152',              href: 'tel:+918869094152',                  color: 'cyan'   },
];

const socials = [
  { icon: FiGithub,    href: 'https://github.com/Ani200418',                    label: 'GitHub'    },
  { icon: FiLinkedin,  href: 'https://www.linkedin.com/in/aniketsingh1805/',    label: 'LinkedIn'  },
  { icon: FiInstagram, href: 'https://www.instagram.com/im_aniketsingh_/',      label: 'Instagram' },
];

const colorStyles = {
  cyan:   { bg:'rgba(0,245,255,0.07)',   border:'rgba(0,245,255,0.18)',   text:'text-cyan-500 dark:text-cyan-400',   hover:'hover:border-cyan-400/30 dark:hover:shadow-[0_0_20px_rgba(0,245,255,0.08)]' },
  violet: { bg:'rgba(139,92,246,0.07)', border:'rgba(139,92,246,0.18)', text:'text-violet-500 dark:text-violet-400', hover:'hover:border-violet-400/30' },
  rose:   { bg:'rgba(244,63,94,0.07)',  border:'rgba(244,63,94,0.18)',  text:'text-rose-500 dark:text-rose-400',   hover:'hover:border-rose-400/30'   },
};

const inputCls = `w-full px-4 py-3 rounded-xl text-sm dark:text-white text-slate-900 dark:placeholder-slate-600 placeholder-slate-400 outline-none transition-all duration-200 dark:bg-white/3 bg-slate-100/70 dark:border dark:border-white/7 border border-slate-200 focus:border-cyan-400/40 dark:focus:border-cyan-400/30`;

export default function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    
    const formData = new FormData(e.currentTarget);
    fetch("https://formsubmit.co/ajax/aniketsingh886909@gmail.com", {
      method: "POST",
      headers: { 'Accept': 'application/json' },
      body: formData
    })
      .then(r => r.json())
      .then(() => {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setStatus('idle'), 5000);
      })
      .catch(() => setStatus('error'));
  };

  return (
    <section id="contact" className="section-padding section-alt relative" style={{ zIndex: 1 }}>
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          label="Contact"
          title="Let's Build Together"
          subtitle="Have a project in mind or just want to connect? My inbox is always open."
        />

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-4"
          >
            <p className="dark:text-slate-400 text-slate-600 leading-relaxed mb-8">
              I&apos;m open to{' '}
              <span className="dark:text-white text-slate-900 font-semibold">SDE internships</span> and{' '}
              <span className="dark:text-white text-slate-900 font-semibold">full-time opportunities</span>.
              Whether it&apos;s a startup, tech company, or open-source collaboration — let&apos;s talk.
            </p>

            {contactItems.map((item, i) => {
              const c = colorStyles[item.color as keyof typeof colorStyles];
              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 4 }}
                  className={`flex items-center gap-4 p-4 rounded-xl glass-card transition-all duration-300 group ${c.hover}`}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: c.bg, border: `1px solid ${c.border}` }}>
                    <item.icon size={16} className={c.text} />
                  </div>
                  <div>
                    <p className="text-xs font-mono dark:text-slate-600 text-slate-400 uppercase tracking-widest">{item.label}</p>
                    <p className={`text-sm font-semibold ${c.text}`}>{item.value}</p>
                  </div>
                </motion.a>
              );
            })}

            <div className="pt-6 dark:border-t dark:border-white/5 border-t border-slate-200">
              <p className="text-xs font-mono dark:text-slate-600 text-slate-400 uppercase tracking-widest mb-4">Find me on</p>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-11 h-11 rounded-xl flex items-center justify-center dark:text-slate-500 text-slate-500 hover:text-cyan-500 dark:hover:text-cyan-400 transition-all duration-300 glass-card"
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="glass-card rounded-2xl p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/5 rounded-full blur-2xl pointer-events-none" />

            <h3 className="text-2xl font-bold dark:text-white text-slate-900 mb-1" style={{ fontFamily: 'Syne, serif' }}>
              Drop a Message
            </h3>
            <p className="text-sm dark:text-slate-500 text-slate-500 mb-6">
              I&apos;ll get back within 24 hours.
            </p>

            {status === 'success' ? (
               <div className="h-64 flex flex-col items-center justify-center text-center space-y-4">
                 <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                   <FiSend size={24} className="text-cyan-500" />
                 </div>
                 <div>
                   <h4 className="text-lg font-bold dark:text-white text-slate-900">Message Sent!</h4>
                   <p className="text-sm dark:text-slate-400 text-slate-600 mt-1">Thanks for reaching out. I will reply soon!</p>
                 </div>
               </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="hidden" name="_cc" value="aniketsingh00011@gmail.com" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_subject" value="New Submission From My Portfolio!" />

                <div>
                  <label className="block text-xs font-mono dark:text-slate-600 text-slate-400 uppercase tracking-widest mb-2">Your Name</label>
                  <input type="text" name="name" required placeholder="John Doe" className={inputCls} disabled={status === 'sending'} />
                </div>
                <div>
                  <label className="block text-xs font-mono dark:text-slate-600 text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
                  <input type="email" name="email" required placeholder="john@example.com" className={inputCls} disabled={status === 'sending'} />
                </div>
                <div>
                  <label className="block text-xs font-mono dark:text-slate-600 text-slate-400 uppercase tracking-widest mb-2">Message</label>
                  <textarea name="message" required rows={4} placeholder="Hi Aniket, I'd like to talk about..." className={`${inputCls} resize-none`} disabled={status === 'sending'} />
                </div>
                
                {status === 'error' && (
                  <p className="text-xs text-rose-500 text-center">Something went wrong. Please try again.</p>
                )}
                
                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  whileHover={status !== 'sending' ? { scale: 1.02, boxShadow: '0 0 28px rgba(0,245,255,0.3)' } : {}}
                  whileTap={status !== 'sending' ? { scale: 0.97 } : {}}
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 ${status === 'sending' ? 'opacity-70 cursor-not-allowed' : ''}`}
                  style={{ background: 'linear-gradient(135deg, rgba(0,245,255,0.9), rgba(139,92,246,0.85))', color: '#030712', fontFamily: 'Syne, serif' }}
                >
                  <FiSend size={14} className={status === 'sending' ? 'animate-pulse' : ''} />
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
