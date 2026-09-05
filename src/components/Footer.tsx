import { Github, Linkedin, Mail, ArrowUp, Instagram } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer(): JSX.Element {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/5 dark:border-white/5">
      <div className="section-shell flex flex-col items-center gap-6 py-10 sm:flex-row sm:justify-between">
        <p className="text-sm text-ink-500 dark:text-mist-400">
          © {year} {t.nav.brand}. {t.footer.rights}
        </p>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/farahHamdan8"
            target="_blank"
            rel="noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-ink-600 transition-colors hover:border-neon-dim hover:text-neon-dim dark:border-white/10 dark:text-mist-400 dark:hover:text-neon"
          >
            <Github size={15} />
          </a>
          <a
            href="https://linkedin.com/in/farah-hamdan-17005528b"
            target="_blank"
            rel="noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-ink-600 transition-colors hover:border-neon-dim hover:text-neon-dim dark:border-white/10 dark:text-mist-400 dark:hover:text-neon"
          >
            <Linkedin size={15} />
          </a>
          <a
            href="https://www.instagram.com/farah_hamdan_8/?hl=ar"
            target="_blank"
            rel="noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-ink-600 transition-colors hover:border-neon-dim hover:text-neon-dim dark:border-white/10 dark:text-mist-400 dark:hover:text-neon"
          >
            <Instagram size={15} />
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=fh115881@gmail.com"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-ink-600 transition-colors hover:border-neon-dim hover:text-neon-dim dark:border-white/10 dark:text-mist-400 dark:hover:text-neon"
          >
            <Mail size={15} />
          </a>
        </div>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-ink-600 transition-colors hover:border-neon-dim hover:text-neon-dim dark:border-white/10 dark:text-mist-400 dark:hover:text-neon"
          aria-label="Back to top"
        >
          <ArrowUp size={15} />
        </button>
      </div>
    </footer>
  );
}
