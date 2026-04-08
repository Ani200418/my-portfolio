'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiStar, FiGitBranch, FiLoader, FiFilter } from 'react-icons/fi';
import SectionHeading from '@/components/ui/SectionHeading';

interface Repo {
  id: number; name: string; description: string | null;
  html_url: string; homepage: string | null; topics: string[];
  language: string | null; stargazers_count: number;
  forks_count: number; updated_at: string;
}

const langColors: Record<string, string> = {
  JavaScript: '#f7df1e', TypeScript: '#3178c6', Python: '#3776ab',
  Java: '#ed8b00', 'C++': '#00599c', HTML: '#e34c26', CSS: '#563d7c',
  Go: '#00add8', Rust: '#dea584',
};

const sortOptions = ['Recent', 'Stars', 'Name'] as const;
type SortOption = typeof sortOptions[number];

const FALLBACK: Repo[] = [
  { id:1, name:'task-manager-app', description:'Full-stack task management with auth, real-time updates, and team collaboration.', html_url:'https://github.com/Ani200418', homepage:null, topics:['react','nodejs','mongodb'], language:'TypeScript', stargazers_count:12, forks_count:3, updated_at:new Date().toISOString() },
  { id:2, name:'ecommerce-platform', description:'Modern e-commerce platform with cart, Stripe payments, and admin dashboard.', html_url:'https://github.com/Ani200418', homepage:null, topics:['nextjs','stripe','prisma'], language:'JavaScript', stargazers_count:8, forks_count:2, updated_at:new Date().toISOString() },
  { id:3, name:'chat-application', description:'Real-time chat with Socket.io, rooms, and end-to-end message delivery.', html_url:'https://github.com/Ani200418', homepage:null, topics:['socketio','nodejs','react'], language:'JavaScript', stargazers_count:5, forks_count:1, updated_at:new Date().toISOString() },
  { id:4, name:'ml-price-predictor', description:'ML model for house price prediction using scikit-learn and a Flask REST API.', html_url:'https://github.com/Ani200418', homepage:null, topics:['python','ml','flask'], language:'Python', stargazers_count:7, forks_count:2, updated_at:new Date().toISOString() },
  { id:5, name:'algo-visualizer', description:'Interactive visualizer for sorting and pathfinding algorithms.', html_url:'https://github.com/Ani200418', homepage:null, topics:['react','algorithms'], language:'TypeScript', stargazers_count:15, forks_count:4, updated_at:new Date().toISOString() },
  { id:6, name:'portfolio-v1', description:'First iteration of my developer portfolio built with React and CSS animations.', html_url:'https://github.com/Ani200418', homepage:null, topics:['react','css'], language:'JavaScript', stargazers_count:3, forks_count:0, updated_at:new Date().toISOString() },
];

export default function ProjectsSection() {
  const [repos, setRepos]       = useState<Repo[]>([]);
  const [filtered, setFiltered] = useState<Repo[]>([]);
  const [loading, setLoading]   = useState(true);
  const [isFallback, setIsFallback] = useState(false);
  const [sort, setSort]         = useState<SortOption>('Recent');
  const [langFilter, setLangFilter] = useState('All');
  const [langs, setLangs]       = useState<string[]>(['All']);

  useEffect(() => {
    fetch('https://api.github.com/users/Ani200418/repos?per_page=100&sort=updated')
      .then(r => r.json())
      .then((data: Repo[]) => {
        if (!Array.isArray(data)) throw new Error();
        const visible = data.filter(r => r.description);
        const list = visible.length ? visible : FALLBACK;
        setRepos(list);
        setLangs(['All', ...Array.from(new Set(list.map(r => r.language).filter(Boolean) as string[]))]);
        setLoading(false);
      })
      .catch(() => {
        setRepos(FALLBACK);
        setLangs(['All', 'TypeScript', 'JavaScript', 'Python']);
        setIsFallback(true);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let r = langFilter === 'All' ? [...repos] : repos.filter(x => x.language === langFilter);
    if (sort === 'Stars') r.sort((a, b) => b.stargazers_count - a.stargazers_count);
    else if (sort === 'Name') r.sort((a, b) => a.name.localeCompare(b.name));
    else r.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
    setFiltered(r);
  }, [repos, sort, langFilter]);

  return (
    <section id="projects" className="section-padding relative" style={{ zIndex: 1 }}>
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="Projects"
          title="Things I've Built"
          subtitle="Live GitHub repositories — real projects, real code."
        />

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-between gap-4 mb-10"
        >
          <div className="flex items-center gap-2 flex-wrap">
            <FiFilter size={13} className="dark:text-slate-600 text-slate-400" />
            {langs.map(lang => (
              <button
                key={lang}
                onClick={() => setLangFilter(lang)}
                className={`text-xs font-mono px-3 py-1.5 rounded-lg border transition-all duration-200 ${
                  langFilter === lang
                    ? 'text-cyan-500 bg-cyan-500/10 border-cyan-500/30'
                    : 'dark:text-slate-500 text-slate-500 dark:bg-white/3 bg-black/3 dark:border-white/5 border-slate-200 dark:hover:border-white/10 hover:border-slate-300 dark:hover:text-slate-300 hover:text-slate-700'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono dark:text-slate-600 text-slate-400">Sort:</span>
            {sortOptions.map(opt => (
              <button
                key={opt}
                onClick={() => setSort(opt)}
                className={`text-xs font-mono px-3 py-1.5 rounded-lg border transition-all duration-200 ${
                  sort === opt
                    ? 'text-violet-500 bg-violet-500/10 border-violet-500/30'
                    : 'dark:text-slate-500 text-slate-500 dark:border-white/5 border-slate-200 dark:hover:text-slate-300 hover:text-slate-700'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </motion.div>

        {isFallback && (
          <p className="text-center text-xs font-mono text-amber-500/70 mb-6 py-2 px-4 rounded-lg bg-amber-500/5 border border-amber-500/10">
            ⚠ Could not reach GitHub API — showing sample projects.
          </p>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
              <FiLoader size={26} className="text-cyan-400/50" />
            </motion.div>
          </div>
        ) : (
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence>
              {filtered.map((repo, i) => (
                <motion.div
                  key={repo.id}
                  layout
                  initial={{ opacity: 0, y: 28, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.06, duration: 0.45 }}
                  whileHover={{ y: -6, transition: { duration: 0.22 } }}
                  className="group glass-card rounded-2xl p-5 flex flex-col gap-4 hover:border-cyan-500/20 dark:hover:shadow-[0_8px_40px_rgba(0,245,255,0.06)] hover:shadow-[0_8px_32px_rgba(0,180,220,0.1)] transition-all duration-300 cursor-default"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: 'rgba(0,245,255,0.07)', border: '1px solid rgba(0,245,255,0.13)' }}
                      >
                        <FiGithub size={15} className="dark:text-cyan-400/70 text-cyan-600/70 group-hover:text-cyan-500 transition-colors" />
                      </div>
                      <h3
                        className="text-sm font-bold dark:text-white/90 text-slate-800 leading-snug"
                        style={{ fontFamily: 'Syne, serif' }}
                      >
                        {repo.name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
                        className="w-7 h-7 rounded-lg flex items-center justify-center dark:text-slate-600 text-slate-400 dark:hover:text-cyan-400 hover:text-cyan-600 transition-colors">
                        <FiGithub size={13} />
                      </a>
                      {repo.homepage && (
                        <a href={repo.homepage} target="_blank" rel="noopener noreferrer"
                          className="w-7 h-7 rounded-lg flex items-center justify-center dark:text-slate-600 text-slate-400 dark:hover:text-violet-400 hover:text-violet-600 transition-colors">
                          <FiExternalLink size={13} />
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-sm dark:text-slate-500 text-slate-500 leading-relaxed flex-1 line-clamp-2">
                    {repo.description || 'No description available.'}
                  </p>

                  {repo.topics?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {repo.topics.slice(0, 4).map(t => (
                        <span key={t} className="tech-tag">{t}</span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-3 dark:border-t dark:border-white/5 border-t border-slate-100">
                    <div className="flex items-center gap-1.5">
                      {repo.language && (
                        <>
                          <div className="w-2.5 h-2.5 rounded-full" style={{ background: langColors[repo.language] || '#888' }} />
                          <span className="text-xs font-mono dark:text-slate-500 text-slate-400">{repo.language}</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-xs dark:text-slate-600 text-slate-400">
                        <FiStar size={11} /> {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1 text-xs dark:text-slate-600 text-slate-400">
                        <FiGitBranch size={11} /> {repo.forks_count}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {filtered.length > 0 && !loading && (
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-12">
            <motion.a
              href="https://github.com/Ani200418" target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: '0 0 28px rgba(0,245,255,0.2)' }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-cyan-500 dark:text-cyan-400 transition-all duration-300"
              style={{ background: 'rgba(0,245,255,0.06)', border: '1px solid rgba(0,245,255,0.2)', fontFamily: 'Syne, serif' }}
            >
              <FiGithub size={16} />
              View All on GitHub
            </motion.a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
