import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Github, ExternalLink, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { Project } from '../types';

const projects: Project[] = [
  {
    id: 'p1',
    title: 'Admin Dashboard',
    description: 'A real-time analytics dashboard with customizable widgets and role-based access.',
    tags: ['React','Vit' ,'JavaScript', 'Nivo', 'Tailwind CSS', 'Material UI'],
    liveUrl: 'https://dashboard-fuvz.vercel.app/',
    repoUrl: 'https://github.com/farahHamdan8/Dashboard',
  },
  {
    id: 'p2',
    title: 'ShopHub',
    description: 'Collaborative trip planning app with drag-and-drop itineraries and offline sync.',
    tags: ['React', 'Vit', 'Context API', 'JavaScript', 'Tailwind CSS'],
    liveUrl: 'https://shop-hub-mu-ten.vercel.app/',
    repoUrl: 'https://github.com/farahHamdan8/ShopHub',
  },
  {
    id: 'p3',
    title: 'Quiz_Web',
    description: 'Browser-based sprite editor with layers, onion-skinning, and export to GIF.',
    tags: ['HTML', 'JavaScript', 'CSS'],
    liveUrl: 'https://farahhamdan8.github.io/Quiz_Web/',
    repoUrl: 'https://github.com/farahHamdan8/Quiz_Web',
  },
  {
    id: 'p4',
    title: 'Hangman Game',
    description: 'E-commerce storefront with a headless CMS and Stripe checkout integration.',
    tags: ['HTML', 'JavaScript', 'CSS'],
    liveUrl: 'https://farahhamdan8.github.io/MyGames/',
    repoUrl: 'https://github.com/farahHamdan8/MyGames',
  },
];

const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)));

export default function Projects(): JSX.Element {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesQuery = p.title.toLowerCase().includes(query.toLowerCase());
      const matchesTag = activeTag ? p.tags.includes(activeTag) : true;
      return matchesQuery && matchesTag;
    });
  }, [query, activeTag]);

  return (
    <section id="projects" className="section-shell py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
      >
        <span className="section-kicker">{t.projects.kicker}</span>
        <h2 className="section-heading mt-3">{t.projects.title}</h2>
      </motion.div>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search
            size={16}
            className="pointer-events-none absolute top-1/2 -translate-y-1/2 text-ink-400 dark:text-mist-400 start-4"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.projects.searchPlaceholder}
            className="w-full rounded-full border border-black/10 bg-white py-3 text-sm text-ink-900 outline-none transition-colors focus:border-neon-dim dark:border-white/10 dark:bg-ink-800 dark:text-white dark:focus:border-neon ps-10 pe-4"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTag(null)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              activeTag === null
                ? 'bg-ink-900 text-white dark:bg-neon dark:text-ink-950'
                : 'border border-black/10 text-ink-600 dark:border-white/10 dark:text-mist-400'
            }`}
          >
            {t.projects.allTag}
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                activeTag === tag
                  ? 'bg-ink-900 text-white dark:bg-neon dark:text-ink-950'
                  : 'border border-black/10 text-ink-600 dark:border-white/10 dark:text-mist-400'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.article
              key={project.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -4 }}
              className="glass-card group flex flex-col justify-between p-6"
            >
              <div>
                <h3 className="font-display text-lg font-semibold text-ink-900 dark:text-white">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-mist-400">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-black/5 px-2.5 py-1 text-[11px] font-medium text-ink-600 dark:bg-white/5 dark:text-mist-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-6 flex items-center gap-4">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-sm font-medium text-neon-dim transition-colors hover:text-ink-900 dark:text-neon dark:hover:text-white"
                >
                  <ExternalLink size={15} />
                  {t.projects.live}
                </a>
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-sm font-medium text-ink-600 transition-colors hover:text-ink-900 dark:text-mist-400 dark:hover:text-white"
                >
                  <Github size={15} />
                  {t.projects.code}
                </a>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-10 flex flex-col items-center gap-3 py-16 text-center"
        >
          <X size={28} className="text-ink-300 dark:text-mist-500" />
          <p className="text-sm text-ink-500 dark:text-mist-400">{t.projects.noResults}</p>
        </motion.div>
      )}
    </section>
  );
}
