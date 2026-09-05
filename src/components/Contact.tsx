import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xzebzlwq';

export default function Contact(): JSX.Element {
  const { t } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error('Request failed');

      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    } finally {
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section id="contact" className="section-shell py-24">
      <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-kicker">{t.contact.kicker}</span>
          <h2 className="section-heading mt-3">{t.contact.title}</h2>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-600 dark:text-mist-400">
            {t.contact.description}
          </p>

          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=fh115881@gmail.com"
            className="mt-8 flex items-center gap-3 text-sm font-medium text-ink-900 transition-colors hover:text-neon-dim dark:text-white dark:hover:text-neon"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black/5 dark:bg-white/5">
              <Mail size={16} />
            </span>
            fh115881@gmail.com
          </a>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="glass-card flex flex-col gap-5 p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-ink-600 dark:text-mist-400">{t.contact.nameLabel}</label>
              <input
                required
                value={form.name}
                onChange={handleChange('name')}
                type="text"
                className="rounded-lg border border-black/10 bg-white px-4 py-3 text-sm text-ink-900 outline-none transition-colors focus:border-neon-dim dark:border-white/10 dark:bg-ink-800 dark:text-white dark:focus:border-neon"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-ink-600 dark:text-mist-400">{t.contact.emailLabel}</label>
              <input
                required
                value={form.email}
                onChange={handleChange('email')}
                type="email"
                className="rounded-lg border border-black/10 bg-white px-4 py-3 text-sm text-ink-900 outline-none transition-colors focus:border-neon-dim dark:border-white/10 dark:bg-ink-800 dark:text-white dark:focus:border-neon"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-ink-600 dark:text-mist-400">{t.contact.messageLabel}</label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={handleChange('message')}
              className="resize-none rounded-lg border border-black/10 bg-white px-4 py-3 text-sm text-ink-900 outline-none transition-colors focus:border-neon-dim dark:border-white/10 dark:bg-ink-800 dark:text-white dark:focus:border-neon"
            />
          </div>

          <button type="submit" disabled={status === 'loading'} className="solid-btn justify-center disabled:opacity-60">
            {status === 'success' ? (
              <>
                <CheckCircle2 size={16} />
                {t.contact.sent}
              </>
            ) : status === 'loading' ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                {t.contact.sending}
              </>
            ) : status === 'error' ? (
              <>
                <AlertCircle size={16} />
                {t.contact.error}
              </>
            ) : (
              <>
                <Send size={16} />
                {t.contact.send}
              </>
            )}
          </button>
        </motion.form>
      </div>
    </section >
  );
}