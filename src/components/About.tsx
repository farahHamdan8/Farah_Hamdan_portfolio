import { motion } from 'framer-motion';
import { GraduationCap, Award, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { TimelineItem } from '../types';

const skills = [
  'React19', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion',
  'Node.js', 'Bootstrap', 'Redux', 'Vite', 'Figma', 'HTML5', 'JS', 'CSS3',
];

const timeline: TimelineItem[] = [
  { id: 't1', type: 'education', year: '2023 — present', titleKey: 'eduTitle', subtitleKey: 'eduSubtitle' },
  { id: 't2', type: 'certification', year: '2026', titleKey: 'cert1Title', subtitleKey: 'cert1Subtitle' },
  { id: 't3', type: 'certification', year: '2026', titleKey: 'cert2Title', subtitleKey: 'cert2Subtitle' },
  { id: 't4', type: 'certification', year: '2026', titleKey: 'cert3Title', subtitleKey: 'cert3Subtitle' },
];

export default function About(): JSX.Element {
  const { t } = useLanguage();

  return (
    <section id="about" className="section-shell py-24 ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
      >
        <span className="section-kicker">{t.about.kicker}</span>
        <h2 className="section-heading mt-3">{t.about.title}</h2>
      </motion.div>

      <div className="mt-12 grid gap-16 lg:grid-cols-2">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-base leading-relaxed text-ink-700 dark:text-mist-300"
          >
            {t.about.bio}
          </motion.p>

          <div className="mt-8 flex flex-wrap gap-2.5">
            {skills.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="rounded-full border border-black/10 px-4 py-1.5 text-sm font-medium text-ink-700 transition-colors hover:border-neon-dim hover:text-neon-dim dark:border-white/10 dark:text-mist-300 dark:hover:text-neon"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute bottom-0 top-0 w-px bg-black/10 dark:bg-white/10 start-[19px]" />
          <div className="flex flex-col gap-10">
            {timeline.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="relative flex gap-5 ps-0"
              >
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neon-dim/50 bg-white text-neon-dim dark:bg-ink-950 dark:text-neon">
                  {item.type === 'education' ? <GraduationCap size={17} /> : <Award size={17} />}
                </div>
                <div className="glass-card flex-1 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-neon-dim dark:text-neon">
                    {item.year}
                  </p>
                  <h3 className="mt-1 font-display text-base font-semibold text-ink-900 dark:text-white">
                    {t.about.timeline[item.titleKey]}
                  </h3>
                  <p className="mt-1 text-sm text-ink-600 dark:text-mist-400">
                    {t.about.timeline[item.subtitleKey]}
                  </p>
                </div>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.3 }}
              className="relative flex items-center gap-5"
            >
              <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-dashed border-neon-dim/50 text-neon-dim dark:text-neon">
                <Sparkles size={16} />
              </div>
              <p className="text-sm italic text-ink-500 dark:text-mist-400">{t.about.timeline.ongoing}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
