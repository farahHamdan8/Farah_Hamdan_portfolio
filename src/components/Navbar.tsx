import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun, Languages, Code2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const NAV_KEYS = ['about', 'projects', 'contact'] as const;

export default function Navbar(): JSX.Element {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-black/5 bg-white/80 backdrop-blur-md dark:border-white/5 dark:bg-ink-950/80'
          : 'bg-transparent'
      }`}
    >
      <nav className="section-shell flex h-20 items-center justify-between">
        <a href="#home" className="flex items-center gap-2 font-display text-lg font-semibold">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink-900 text-neon dark:bg-neon dark:text-ink-950">
            <Code2 size={18} strokeWidth={2.5} />
          </span>
          <span className="text-ink-900 dark:text-white">
            {t.nav.brand}
            <span className="text-neon-dim dark:text-neon">.</span>
          </span>
        </a>

        <div className="hidden items-center gap-10 md:flex">
          {NAV_KEYS.map((key) => (
            <button
              key={key}
              onClick={() => handleNavClick(key)}
              className="text-sm font-medium text-ink-700 transition-colors hover:text-neon-dim dark:text-mist-300 dark:hover:text-neon"
            >
              {t.nav[key]}
            </button>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={toggleLanguage}
            aria-label="Toggle language"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-ink-700 transition-colors hover:border-neon-dim hover:text-neon-dim dark:border-white/10 dark:text-mist-300 dark:hover:text-neon"
          >
            <Languages size={17} />
          </button>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-ink-700 transition-colors hover:border-neon-dim hover:text-neon-dim dark:border-white/10 dark:text-mist-300 dark:hover:text-neon"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex"
              >
                {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
              </motion.span>
            </AnimatePresence>
          </button>
          <button onClick={() => handleNavClick('contact')} className="solid-btn !py-2.5 !px-5 text-sm">
            {t.nav.cta}
          </button>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 dark:border-white/10 md:hidden"
          onClick={() => setIsOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-black/5 bg-white dark:border-white/5 dark:bg-ink-950 md:hidden"
          >
            <div className="section-shell flex flex-col gap-4 py-6">
              {NAV_KEYS.map((key) => (
                <button
                  key={key}
                  onClick={() => handleNavClick(key)}
                  className="text-start text-sm font-medium text-ink-700 dark:text-mist-300"
                >
                  {t.nav[key]}
                </button>
              ))}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={toggleLanguage}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 dark:border-white/10"
                >
                  <Languages size={17} />
                </button>
                <button
                  onClick={toggleTheme}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 dark:border-white/10"
                >
                  {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
                </button>
                <button onClick={() => handleNavClick('contact')} className="solid-btn !py-2.5 !px-5 text-sm flex-1 justify-center">
                  {t.nav.cta}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
