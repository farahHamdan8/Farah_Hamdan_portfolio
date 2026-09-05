import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Instagram, Linkedin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Hero(): JSX.Element {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative flex min-h-[92vh] items-center pt-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 flex justify-center">
        <div className="h-[420px] w-[420px] rounded-full bg-neon/10 blur-[120px] dark:bg-neon/20" />
      </div>

      <div className="section-shell grid items-center gap-14 py-20 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="section-kicker">{t.hero.kicker}</span>

          <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight text-ink-900 dark:text-white sm:text-5xl lg:text-6xl">
            {t.hero.titleLine1}
            <br />
            <span className="text-neon-dim dark:text-neon">{t.hero.titleHighlight}</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-700 dark:text-mist-300 sm:text-lg">
            {t.hero.bio}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href="#projects" className="solid-btn group">
              {t.hero.ctaPrimary}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
            </a>
            <a href="/resume.pdf" download className="neon-outline-btn">
              <Download size={16} />
              {t.hero.ctaSecondary}
            </a>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <a
              href="https://github.com/farahHamdan8"
              target="_blank"
              rel="noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 text-ink-700 transition-colors hover:border-neon-dim hover:text-neon-dim dark:border-white/10 dark:text-mist-300 dark:hover:text-neon"
            >
              <Github size={18} />
            </a>
            <a
              href="https://linkedin.com/in/farah-hamdan-17005528b"
              target="_blank"
              rel="noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 text-ink-700 transition-colors hover:border-neon-dim hover:text-neon-dim dark:border-white/10 dark:text-mist-300 dark:hover:text-neon"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://www.instagram.com/farah_hamdan_8/?hl=ar"
              target="_blank"
              rel="noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 text-ink-700 transition-colors hover:border-neon-dim hover:text-neon-dim dark:border-white/10 dark:text-mist-300 dark:hover:text-neon"
            >
              <Instagram size={18} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="glass-card relative overflow-hidden p-8">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-neon/20 blur-3xl" />
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400/70" />
              <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
              {/* تم تغيير bg-green-400/70 إلى neon */}
              <span className="h-3 w-3 rounded-full bg-neon-dim dark:bg-neon" />
            </div>
            <pre className="mt-6 overflow-x-auto text-xs leading-relaxed text-ink-700 dark:text-mist-300">
              <code>{`const dev = {
  role: "Front-End Engineer",
  stack: ["React", "TS",
          "Tailwind"],
  focus: "clean, fast UI",
  status: "open to work"
};`}</code>
            </pre>
          </div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-6 -left-6 rounded-xl border border-black/5 bg-white px-4 py-3 shadow-card dark:border-white/10 dark:bg-ink-800"
          >
            <p className="text-xs font-medium text-ink-500 dark:text-mist-400">{t.hero.badgeLabel}</p>
            <p className="font-display text-lg font-semibold text-neon-dim dark:text-neon">{t.hero.badgeValue}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}