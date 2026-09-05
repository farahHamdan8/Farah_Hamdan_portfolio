import { useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function DocumentSync(): null {
  const { theme } = useTheme();
  const { language, dir } = useLanguage();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('lang', language);
    root.setAttribute('dir', dir);
  }, [language, dir]);

  return null;
}

function AppShell(): JSX.Element {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white dark:bg-ink-950">
      <div className="pointer-events-none fixed inset-0 bg-grid bg-grid opacity-40 dark:opacity-20" />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default function App(): JSX.Element {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <DocumentSync />
        <AppShell />
      </LanguageProvider>
    </ThemeProvider>
  );
}
